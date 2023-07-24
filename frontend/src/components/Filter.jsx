import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Box,
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";

const FilterComponent = ({ columns, onApply }) => {
  const [open, setOpen] = useState(false);
  const handleDialogOpen = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);

  const [filters, setFilters] = useState([
    { column: "", operator: "", value: "" },
  ]);

  // Handler for changing the column 
  const handleColumnChange = (event, index) => {
    const newFilters = [...filters];
    newFilters[index].column = event.target.value;
    setFilters(newFilters);
  };
  // Handler for changing the operator 
  const handleOperatorChange = (event, index) => {
    const newFilters = [...filters];
    newFilters[index].operator = event.target.value;
    setFilters(newFilters);
  };
  // Handler for changing the value 
  const handleValueChange = (event, index) => {
    const newFilters = [...filters];
    newFilters[index].value = event.target.value;
    setFilters(newFilters);
  };
  // Handler to add another filter 
  const handleAddFilter = () => {
    setFilters([...filters, { column: "", operator: "", value: "" }]);
  };
  // Handler to remove filter 
  const handleRemoveFilter = (index) => {
    const newFilters = [...filters];
    newFilters.splice(index, 1);
    setFilters(newFilters);
  };

  // Handler to clear all the filters 
  const handleResetFilters = () => {
    setFilters([{ column: "", operator: "", value: "" }]);
  };
  // Handler to apply the filter and close dialog 
  const handleApply = () => {
    onApply(filters);
    handleDialogClose();
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleDialogOpen}>
        <FilterListOutlinedIcon />
        Filter
      </Button>
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>Filter Data</DialogTitle>
        <DialogContent>
          {filters.map((filter, index) => (
            <Box key={index}>
              <FormControl variant="outlined" style={{ margin: "3px" }}>
                <InputLabel>Column</InputLabel>
                <Select
                  style={{ minWidth: "100px", maxWidth: "200px" }}
                  value={filter.column}
                  onChange={(event) => handleColumnChange(event, index)}
                >
                  {columns.map((column) => (
                    <MenuItem key={column} value={column}>
                      {column}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl variant="outlined" style={{ margin: "3px" }}>
                <InputLabel>Operator</InputLabel>
                <Select
                  style={{ minWidth: "100px", maxWidth: "200px" }}
                  value={filter.operator}
                  onChange={(event) => handleOperatorChange(event, index)}
                >
                  <MenuItem value="equals">Equals</MenuItem>
                  <MenuItem value="not_equals">Not Equals</MenuItem>
                  <MenuItem value="contains">Contains</MenuItem>
                  <MenuItem value="not_contains">Not Contains</MenuItem>
                  <MenuItem value="starts_with">Starts With</MenuItem>
                  <MenuItem value="ends_with">Ends With</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" style={{ margin: "3px" }}>
                <TextField
                  style={{ width: "150px", minWidth: "100px" }}
                  label="Value"
                  variant="outlined"
                  value={filter.value}
                  onChange={(event) => handleValueChange(event, index)}
                />
              </FormControl>
              {index > 0 && (
                <IconButton
                  style={{ marginTop: "5px" }}
                  onClick={() => handleRemoveFilter(index)}
                >
                  <DeleteOutlinedIcon />
                </IconButton>
              )}
            </Box>
          ))}
          <Button onClick={handleAddFilter}>Add Filter</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleResetFilters}>Reset</Button>
          <Button onClick={handleApply}>Apply</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FilterComponent;
