import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const DataTable = ({ rows, columns, rowsPerPageOptions, pageSize,loading }) => {
  return (
    <Box
      height="80vh"
      width={"100%"}
      sx={{
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#2E3134",
          borderBottom: "none",
          color: "#fff",
        },
        
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        rowsPerPageOptions={rowsPerPageOptions}
        pageSize={pageSize}
        loading = {loading}
      />
    </Box>
  );
};

export default DataTable;
