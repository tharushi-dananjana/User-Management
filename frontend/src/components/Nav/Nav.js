import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import { BiHome, BiLogOut, BiUser, BiUserCircle } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">Ayu Mantra</h2>
      <ul className="nav-links">
        <li>
          <Link to="/AmainHome">
            <BiHome className="icon" />
            Home
          </Link>
        </li>
        <li>
          <Link to="/adminHome">
            <RiAdminFill className="icon" />
            Admin Dashboard
          </Link>
        </li>
        <li>
          <Link to="/doctorHome">
            <FaUsers className="icon" />
            Doctor Management
          </Link>
        </li>
        <li>
          <Link to="/adduserH">
            <BiUser className="icon" />
            User Management
          </Link>
        </li>
        {/* New Profile Link */}
        <li>
          <Link to="/profile">
            <BiUserCircle className="icon" />
            Profile
          </Link>
        </li>
        <li className="logout">
          <Link to="/">
            <BiLogOut className="icon" />
            Log Out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
