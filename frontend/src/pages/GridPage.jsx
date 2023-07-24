import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Tab } from "@mui/material";
import DataTable from "../components/DataTable";
import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import FilterComponent from "../components/Filter";
import { TabContext } from "@mui/lab";
import { TabList } from "@mui/lab";
import { TabPanel } from "@mui/lab";

const LoadData = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState();
  const [startReport, setStartReport] = useState(false);
  const [report, setReport] = useState("");
  const [TabValue, setTabValue] = useState("1");
  const [loading, setLoading] = useState(false);


  // Function to handle applying filters 
  const handleApplyFilters = (filters) => {
    const filterObjects = filters.map((filter) => ({
      column: filter.column,
      operator: filter.operator,
      value: filter.value,
    }));
    setFilters(JSON.stringify(filterObjects));
  };

  // Function to handle tab change 
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // UseEffect to fetch filtered data 
  useEffect(() => {
    const FetchFilterData = async () => {
      if (!filters) {
        return;
      }
      setLoading(true);

      const formData = new FormData();
      formData.append("filters", filters);
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/filter_data",
          formData,
        );
        setData(
          response.data.map((row, index) => ({
            ...row,
            id: index,
            Date: new Date(row.Date).toISOString().split("T")[0],
          })),
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    };

    FetchFilterData();
  }, [filters]);

  // useEffect to fetch initial data 
  useEffect(() => {
    const FetchData = async () => {
      setLoading(true);
      const formData = new FormData();
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/Grid_data",
          formData,
        );
        setData(
          response.data.map((row, index) => ({
            ...row,
            id: index,
            Date: new Date(row.Date).toISOString().split("T")[0],
          })),
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    };
    FetchData();
  }, []);

  // useEffect to handle fetch the generated report 
  useEffect(() => {
    const handleReport = async () => {
      if (!startReport) {
        return;
      }
      const formData = new FormData();
      formData.append("startReport", startReport);
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/generate_report",
          formData,
        );
        setReport(`data:text/html;base64,${btoa(response.data)}`);
      } catch (error) {
        console.error(error);
      }
      setStartReport(false);
      setTabValue("2");
    };

    handleReport();
  }, [startReport]);

  // Determine the data based on the data to be displayed in the grid 
  const columns =
    data.length > 0
      ? Object.keys(data[0]).map((key) => ({
          field: key,
          headerName: key,
          flex: 1,
        }))
      : [];

  return (
    <Box>
      <Navbar />
      <Box style={{ display: "flex", width: "100%" }}>
        <Box>
          <SideBar />
        </Box>
        <Box style={{ width: "90%" }}>
          <TabContext value={TabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "Boxider" }}>
              <TabList sx={{ ml: "15px" }} onChange={handleTabChange}>
                <Tab label="Grid" value="1" />
                <Tab label="Report" value="2" disabled={!report} />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Box display={"flex"} marginLeft={"67%"}>
                <FilterComponent
                  columns={columns.flatMap((key) => key.field)}
                  onApply={handleApplyFilters}
                ></FilterComponent>
                <Button
                  style={{ margin: "0 10px 2px 10px " }}
                  variant="contained"
                  onClick={() => {
                    setStartReport(true);
                  }}
                >
                  Analyze Data
                </Button>
              </Box>
              <Box style={{ height: 500, margin: "1% 0 0 5%" }}>
                <DataTable
                  rows={data}
                  columns={columns}
                  loading={loading}
                />
              </Box>
            </TabPanel>
            <TabPanel value="2">
              <Box width="100%">
                {report && (
                  <iframe
                    src={report}
                    style={{ width: "100%", height: "750px" }}
                  />
                )}
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};

export default LoadData;
