import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import logo from "../../../pics/logo.png"
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
      <nav>
        <div className='img-container'>
            <img src={logo}  />
        </div>
        <div className='links'>
        <ul>
            <li className=""><Link to='/' >Home</Link></li>
            <li className=""><Link to='/login' >Sign in </Link></li>
            <li className=""><Link to='/contactUs' >Contact Us</Link></li>
            <button className='btn-createRemote'>Create Remote</button>
       </ul>
       
     
     </div>
      </nav>
    </div>
  );
};
  
export default Navbar;