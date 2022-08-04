import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../pics/logo.png";
import "./Navbar.css";
import toast from "react-hot-toast";

const Navbar = ({ disable = false }) => {
  let nav = useNavigate();
  const user_id = localStorage.getItem("user_id");

  function openIde() {
    if (user_id) {
      nav("/generateRoomId");
    } else {
      toast.error("You Are Not Registered. Sign Up First.");
    }
  }
  function openRoom(e) {
    e.preventDefault();
    if (user_id) {
      nav("/generateRoomId");
    } else {
      toast.error("You Are Not Registered. Sign up First.");
    }
  }
  function openProfile(e) {
    e.preventDefault();
    if (user_id) {
      nav("/profile");
    } else {
      toast.error("You Are Not Registered. Sign up First.");
    }
  }

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
              <Link to="/">Home</Link>
            </li>
            <li className="">
              <Link to="" onClick={(e) => openRoom(e)}>
                Rooms
              </Link>
            </li>
            {!disable && (
              <li className="">
                <Link to="/login">Sign in </Link>
              </li>
            )}
            <li className="">
              <Link to="" onClick={(e) => openProfile(e)}>
                Profile
              </Link>
            </li>
            <li className="">
              <Link to="/contactUs">Contact Us</Link>
            </li>
            <button className="btn-createRemote" onClick={(e) => openIde(e)}>
              Create Remote
            </button>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
