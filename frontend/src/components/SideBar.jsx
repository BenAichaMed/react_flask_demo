import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import TableChartIcon from "@mui/icons-material/TableChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import "../styles/SideBar.css";

const SideBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <div
      className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <ul className="sidebar-nav">
        <li className={`sidebar-nav-item ${isActive("/Grid")}`}>
          <Link to="/Grid">
            <i className="icon">
              <TableChartIcon />
            </i>
            <span>Table</span>
          </Link>
        </li>
        <li className={`sidebar-nav-item ${isActive("/Chart")}`}>
          <Link to="/Chart">
            <i className="icon">
              <ShowChartIcon />
            </i>
            <span>Chart</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
