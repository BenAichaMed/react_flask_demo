import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select, MenuItem, Box, TextField } from "@mui/material";
import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ChartPage = () => {
  const [Data, setData] = useState([]);
  const [startDate, setStartDate] = useState("2022-01-12");
  const [endDate, setEndDate] = useState("2022-01-22");
  const [filterOption, setFilterOption] = useState("Date");
  const [uniqueProducts, setUniqueProducts] = useState([]);
  const [uniqueStores, setUniqueStores] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("P1");
  const [selectedStore, setSelectedStore] = useState("S1");


  // UseEffect to fetch data 
  useEffect(() => {
    const fetchData = async () => {
      const formData = new FormData();
      formData.append("start_date", startDate);
      formData.append("end_date", endDate);
      formData.append("filter_option", filterOption);

      if (filterOption === "Product") {
        formData.append("selected_product", selectedProduct);
      } else if (filterOption === "Store") {
        formData.append("selected_store", selectedStore);
      }

      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/Chart_data",
          formData,
        );

        const formattedData = response.data.data.map((item) => ({
          ...item,
          Date: new Date(item.Date).toISOString().split("T")[0],
        }));

        setData(formattedData);
        setUniqueProducts(response.data.unique_products);
        setUniqueStores(response.data.unique_stores);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [startDate, endDate, filterOption, selectedProduct, selectedStore]);

  // Function to handle changes in the filter option dropdown 
  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };
  // Function to handle changes in the selected product dropdown 
  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };
  // Function to handle changes in the selected store dropdown 
  const handleStoreChange = (event) => {
    setSelectedStore(event.target.value);
  };

  return (
    <Box id="Container">
      <Navbar />
      <Box display={"flex"}>
        <Box id="Sidebar">
          <SideBar />
        </Box>
        <Box id="Chart" width={"100%"}>
          <Box
            display="flex"
            alignItems="center"
            margin="2% 0 0 40%"
            id="Date_pick"
          >
            <Box>
              <label>Start Date:</label>
              <TextField
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                sx={{ marginLeft: "10px" }}
              />
            </Box>
            <Box sx={{ marginLeft: "20px" }}>
              <label>End Date:</label>
              <TextField
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                sx={{ marginLeft: "10px" }}
              />
            </Box>
          </Box>
          <Box display="flex" alignItems="center" margin="2% 0 0 5%">
            <Box>
              <label>Filter By:</label>
              <Select value={filterOption} onChange={handleFilterChange}>
                <MenuItem value="Date">Default</MenuItem>
                <MenuItem value="Product">Sales by Product</MenuItem>
                <MenuItem value="Store">Sales by Store</MenuItem>
              </Select>
            </Box>
            {filterOption === "Product" && (
              <Box>
                <label>Select Product:</label>
                <Select value={selectedProduct} onChange={handleProductChange}>
                  {uniqueProducts.map((product) => (
                    <MenuItem key={product} value={product}>
                      {product}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            )}
            {filterOption === "Store" && (
              <Box>
                <label>Select Store:</label>
                <Select value={selectedStore} onChange={handleStoreChange}>
                  {uniqueStores.map((store) => (
                    <MenuItem key={store} value={store}>
                      {store}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            )}
          </Box>
          <ResponsiveContainer width={"90%"} height={600}>
            <LineChart data={Data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date" label={"Date"} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey="Sales" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default ChartPage;
