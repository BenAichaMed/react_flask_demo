import React, { useState, useEffect } from "react";
import { Popover, Typography, Box, Avatar } from "@mui/material";
import axios from "axios";
import photo from "../assets/Photo.jpg";
import anant from "../assets/anant.png";
import "../styles/Navbar.css";
import "../styles/button.scss";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const API_KEY = "e0fca1107511074e75e85918de125efc";
  const CITY_NAME = "Bouhjar";
  const [weatherData, setWeatherData] = useState(null);
  
  // Extracting infos from the weather data 
  const temperature = weatherData
    ? Math.round(weatherData.main.temp - 273.15)
    : "";
  const description = weatherData ? weatherData.weather[0].description : "";
  const weatherIconCode = weatherData ? weatherData.weather[0].icon : "";
  const weatherIconUrl = `http://openweathermap.org/img/w/${weatherIconCode}.png`;

  // Handler for opening popover 
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handler for closing popover 
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // UseEffect to fetch weather data from the api 
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&APPID=${API_KEY}`,
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeatherData();
  }, [API_KEY, CITY_NAME]);

  return (
    <Box>
      <nav>
        <Box className="logo logo1">
          <img src={anant} alt="anant" />
          Anant Corporation
        </Box>
        <Box
          className="logo logo2"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          Mohamed Ben Aicha
        </Box>
      </nav>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Box display={"flex"} width={"30rem"}>
          <Box width={"30%"} margin={"10%"}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
              }}
              alt="my photo"
              src={photo}
            />
          </Box>
          <Box width={"60%"}>
            <Typography sx={{ p: 1, color: "#000000" }}>
              <span className="bold">Name</span>: Mohamed
              <br />
              <span className="bold">Location</span>: Tunisia <br />
              <span className="bold">Title</span>: Software Enginnering Student{" "}
              <br />
              <span className="bold">Email</span>: benaichamed66@gmail.com{" "}
              <br />
              <span className="bold">Weather</span>:
            </Typography>
            <Box display={"flex"}>
              <img
                src={weatherIconUrl}
                alt="Weather Icon"
                style={{ width: "40px", height: "40px" }}
              />
              <p style={{ color: "#000", marginTop: "16px" }}>
                {temperature}°C
              </p>
              <p style={{ color: "#000", marginTop: "14px" }}>{description}</p>
            </Box>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default Navbar;
