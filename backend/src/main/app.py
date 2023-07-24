from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
import json
from ydata_profiling import ProfileReport


app = Flask(__name__)
CORS(app, origins="http://localhost:5173")

# Read the CSV and convert the 'Date' column
df = pd.read_csv("backend/clean_sales.csv")
df["Date"] = pd.to_datetime(df["Date"])

# Route to load the data to the grid
@app.route("/Grid_data", methods=["POST"])
def load_data():

    return jsonify(df.to_dict(orient="records"))

# Route to filter the data 
@app.route("/filter_data", methods=["POST"])
def filter_data():

    filters = request.form["filters"]

    filters = json.loads(filters) if filters else None
    if filters is not None and filters[0]["column"] != "":
        filtered_data = df.copy()

        for f in filters:
            column = f["column"]
            operator = f["operator"]
            value = f["value"]

            if df[column].dtype == "str":
                value = str(value)
            elif pd.api.types.is_numeric_dtype(df[column].dtype):
                value = pd.to_numeric(value, errors="coerce")
            else:
                pass

            if operator == "equals":
                filtered_data = filtered_data.loc[filtered_data[column] == value]
            elif operator == "not_equals":
                filtered_data = filtered_data.loc[filtered_data[column] != value]
            elif operator == "contains":
                filtered_data = filtered_data.loc[
                    filtered_data[column].str.contains(value, na=False)
                ]
            elif operator == "not_contains":
                filtered_data = filtered_data.loc[
                    ~filtered_data[column].str.contains(value, na=False)
                ]
            elif operator == "starts_with":
                filtered_data = filtered_data.loc[
                    filtered_data[column].str.startswith(value, na=False)
                ]
            elif operator == "ends_with":
                filtered_data = filtered_data.loc[
                    filtered_data[column].str.endswith(value, na=False)
                ]
            else:
                return "Please choose again :)"
    else:
        filtered_data = df.copy()

    return jsonify(filtered_data.to_dict("records"))

# Route to generate a report 
@app.route("/generate_report", methods=["POST"])
def generate_report():
    start = request.form["startReport"]
    if start:

        profile = ProfileReport(df, dark_mode=True, title="Report")

    return jsonify(profile.to_html())

# Route to fetch data for chart 
@app.route("/Chart_data", methods=["POST"])
def chart_data():
    start_date = request.form["start_date"]
    end_date = request.form["end_date"]

    filtered_df = df[(df["Date"] >= start_date) & (df["Date"] <= end_date)]

    filter_option = request.form["filter_option"]

    if filter_option == "Date":
        grouped_data = filtered_df.groupby("Date")["Sales"].sum().reset_index()
    elif filter_option == "Product":
        selected_product = request.form["selected_product"]

        grouped_data = filtered_df[filtered_df["Product"] == selected_product]
        grouped_data = (
            grouped_data.groupby(["Date", "Product"])["Sales"].sum().reset_index()
        )
    elif filter_option == "Store":
        selected_store = request.form["selected_store"]

        grouped_data = filtered_df[filtered_df["Store"] == selected_store]
        grouped_data = (
            grouped_data.groupby(["Date", "Store"])["Sales"].sum().reset_index()
        )
    else:
        return jsonify(
            {
                "data": [],
                "unique_dates": [],
                "unique_products": [],
                "unique_stores": [],
            }
        )

    grouped_data_dict = grouped_data.to_dict(orient="records")

    unique_dates = filtered_df["Date"].unique().tolist()
    unique_products = filtered_df["Product"].unique().tolist()
    unique_stores = filtered_df["Store"].unique().tolist()

    return jsonify(
        {
            "data": grouped_data_dict,
            "unique_dates": unique_dates,
            "unique_products": unique_products,
            "unique_stores": unique_stores,
        }
    )


if __name__ == "__main__":
    app.run(debug=True)
