import './Login.css'
import { BsFacebook } from 'react-icons/bs';
import { AiFillLinkedin } from 'react-icons/ai';
import { AiOutlineInstagram } from 'react-icons/ai';
import React, { useState } from "react";

function Login(){
    
const handleClick = (e) =>{
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");
    
    signUpButton.addEventListener("click", () => {
        container.classList.add("right-panel-active");
    });
    
    signInButton.addEventListener("click", () => {
        container.classList.remove("right-panel-active");
    });  
}


   



return(
    <div className='wholeContainer'>
         <div className="container" id="container">
    <div className="form-container sign-up-container">
      <form>
        <h1 className="title">Create New Account</h1>
        <div className="social-container signup">
          <a  className="social"><BsFacebook/></a>
          <a className="social"><AiFillLinkedin/></a>
          <a  className="social"><AiOutlineInstagram/></a>
        </div>
       
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button  className="btn-signin" id="sup">Sign Up</button>
      </form>
    </div>
    <div className="form-container sign-in-container">
      <form>
        <h1 className="title">Sign In</h1>
        <div className="social-container ">
        <a className="social"><BsFacebook/></a>
          <a  className="social"><AiFillLinkedin/></a>
          <a  className="social"><AiOutlineInstagram/></a>
        </div>
        <span className="span">Already have an account? </span>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="btn-signin">Sign In</button>
      </form>
    </div>

    <div className="overlay-container">
      <div className="overlay">
        <div className="overlay-panel overlay-left">
          <h1 className="title">Welcome Back</h1>
          <p className="text">If you already have an account please sign in to stay connected with us.</p>
          <button className="btn-signin ghost gradient-button gradient-button-1" id="signIn">Sign In</button>
        </div>
        <div className="overlay-panel overlay-right">
          <h1 className="title">Hello Devs</h1>
          <p className="text">Don't have an account? Please sign up to stay connect with us. </p>
          <button onClick={handleClick} className="btn-signin ghost gradient-button gradient-button-1 " id="signUp" >Sign Up</button>
        </div>
      </div>
    </div>




    </div>
    </div>
)


}

export default Login;