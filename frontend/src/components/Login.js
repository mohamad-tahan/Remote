import './Login.css'
import { BsFacebook } from 'react-icons/bs';
import { AiFillLinkedin } from 'react-icons/ai';
import { AiOutlineInstagram } from 'react-icons/ai';
import React, { useState } from "react";

function Login(){
const [swap, setSwap] = useState(true);

const [name, setName] = useState("");
const [username, setUserName] = useState("");
const [email, setEmailRegister] = useState("");
const [password, setPasswordRegister] = useState("");

const handleSignup = async (e) => {
  e.preventDefault();

    const res = await fetch("http://127.0.0.1:3000/api/user/auth/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: name,
        username: username,
        email:email,
        password:password
      }),
    });
    const response = await res.json();
    console.log(response)

    if (response.user) {
      alert("You are successfully registered.");
    }
    else{
      alert("Error signing up.");
    }
   
};

return(
    <div className='wholeContainer'>
         <div className={swap ? "container" : "container right-panel-active" } id="container">
    <div className="form-container sign-up-container">
      <form>
        <h1 className="title">Create New Account</h1>
        <div className="social-container signup">
          <a  className="social"><BsFacebook/></a>
          <a className="social"><AiFillLinkedin/></a>
          <a  className="social"><AiOutlineInstagram/></a>
        </div>
       
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
        <input type="text" placeholder="Username" onChange={(e) => setUserName(e.target.value)}/>
        <input type="email" placeholder="Email" onChange={(e) => setEmailRegister(e.target.value)}/>
        <input type="password" placeholder="Password" onChange={(e) => setPasswordRegister(e.target.value)}/>
        <button  className="btn-signin" id="sup" onClick={handleSignup}>Sign Up</button>
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
          <button  onClick={()=> {setSwap(!swap)}} className="btn-signin ghost gradient-button gradient-button-1" id="signIn">Sign In</button>
        </div>
        <div className="overlay-panel overlay-right">
          <h1 className="title">Hello Devs</h1>
          <p className="text">Don't have an account? Please sign up to stay connect with us. </p>
          <button onClick={()=> {setSwap(!swap)}} className="btn-signin ghost gradient-button gradient-button-1 " id="signUp" >Sign Up</button>
        </div>
      </div>
    </div>
    </div>
    </div>
)


}

export default Login;