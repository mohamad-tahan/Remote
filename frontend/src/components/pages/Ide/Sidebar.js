import React, { useState } from "react";
import "./Sidebar.css";
import { FaBars, FaUserAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { AiFillHome, AiOutlinePlus } from "react-icons/ai";
import { RiLogoutBoxLine } from "react-icons/ri";
import PlusButton from "./PlusButton";
import { TbCopy } from "react-icons/tb";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const Sidebar = ({ setShowModel, setIsSaving }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const username = localStorage.getItem("username");
  const { roomId } = useParams();

  const menuItem = [
    {
      path: "/",
      name: "Home",
      icon: <AiFillHome />,
    },
    {
      path: "",
      name: "New Remote",
      icon: <PlusButton />,
      func: setShowModel,
    },

    {
      path: "/profile",
      name: "Profile",
      icon: <FaUserAlt />,
    },
    {
      path: "",
      name: "Copy Room Id",
      icon: <TbCopy />,
      func: () => handleClick(),
    },

    {
      path: "/logout",
      name: "Log Out",
      icon: <RiLogoutBoxLine />,
    },
  ];

  const handleClick = () => {
    try {
      navigator.clipboard.writeText(roomId);
      toast.success("Room Id Copied");
    } catch {
      toast.error("Could Not Copy Room ID");
    }
  };

  return (
    <div className="containerr">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1
            style={{ display: isOpen ? "block" : "none" }}
            className="username"
          >
            @{username}
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        <br />
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
            onClick={item.func ?? null}
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
