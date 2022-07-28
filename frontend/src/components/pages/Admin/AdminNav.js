import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../pics/logo.png";
import "../MainPage/Navbar.css";
import toast from "react-hot-toast";

const AdminNav = () => {
  let nav = useNavigate();

  return (
    <div className="navbar">
      <nav>
        <div className="img-container">
          <img
            src={logo}
            className="logoNav"
            onClick={() => {
              nav("/");
            }}
          />
        </div>
        <div className="links">
          <ul>
            <li className="">
              <Link to="/addUser">Add User</Link>
            </li>
            <li className="">
              <Link to="/viewUsers">View Users</Link>
            </li>
            <li className="">
              <Link to="/addLanguage">Add Language</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default AdminNav;
