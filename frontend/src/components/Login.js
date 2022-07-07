import './Login.css'
import { BsFacebook } from 'react-icons/bs';
import { AiFillLinkedin } from 'react-icons/ai';
import { AiOutlineInstagram } from 'react-icons/ai';
import React, { useState } from "react";
import jwt_decode from "jwt-decode"
import toast from 'react-hot-toast';

function Login(){
 
const [swap, setSwap] = useState(true);

const [name, setName] = useState("");
const [username, setUserName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

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

    if (response.user) {
      toast.success(`You Are Now Registered.`);
      setName("");
      setUserName("");
      setEmail("");
      setPassword("");
    }
    else{
      toast.errot("Error signing up.");
    }
   
   
};

const handleSignin = async (e) => {
  e.preventDefault();
  const response = await loginUser({
    email,
    password,
  });

  if ("token" in response) {
    var user = jwt_decode(response.token);
    console.log(user);
    localStorage.setItem("user_id", user._id);
    localStorage.setItem("username", user.username);

    try {
      toast.success(`You Are Now Logged in.`);
      localStorage.setItem("token", response["token"]);
      setEmail("");
      setPassword("");
    
    } catch {
      toast.error("Failed.")
      console.log(response);
    }
  } else {
    toast.error("You are not Authorized!");
  }
};
async function loginUser(credentials) {
  
  return fetch("http://localhost:3000/api/user/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    
    body: JSON.stringify(credentials),
  }).then((response) => response.json() )
  
  .catch(err => toast.error("You Are Not Authorized. Sign Up")); 
}



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
       
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="text" placeholder="Username"  value={username} onChange={(e) => setUserName(e.target.value)}/>
        <input type="email" placeholder="Email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Password"  value={password}onChange={(e) => setPassword(e.target.value)}/>
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
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={handleSignin} className="btn-signin">Sign In</button>
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