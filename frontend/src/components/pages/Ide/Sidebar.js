import React, { useState } from 'react';
import './Sidebar.css'
import {FaBars,FaUserAlt}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import {AiFillHome, AiOutlinePlus} from "react-icons/ai";

const Sidebar = () => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);

    const menuItem=[
        {
            path:"/home",
            name:"Home",
            icon:<AiFillHome/>
        },
        {
            path:"/profile",
            name:"New Remote",
            icon:<AiOutlinePlus/>
        },
        {
            path:"/profile",
            name:"Profile",
            icon:<FaUserAlt/>
        },
     
       
    ]
    return (
        <div className="containerr">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="username">@username</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
 
        </div>
    );
};

export default Sidebar;