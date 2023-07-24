import React from "react";
import Typewriter from "typewriter-effect";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import "../styles/button.scss";

const HomePage = () => {

  return (
    <div className="container">
      <Navbar />
      <div className="wrapper">
        <div className="cols cols0">
          <span className="topline">Hello & Welcome</span>
          <h1>
            <Typewriter
              options={{
                strings: [
                  "This is an interview For",
                  "Anant Corporation",
                  "Let's start!",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          <div>
          <Link to="/Grid">
        <button className="neon-button">Start</button>
      </Link>
          </div>
          <div className="links">
            <span>
              <GitHubIcon style={{ fontSize: 35 }} />
            </span>
            <span>
              <LinkedInIcon style={{ fontSize: 35 }} />
            </span>
            <span>
              <TwitterIcon style={{ fontSize: 35 }} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
