import React, {useEffect, useState} from 'react'
import './Profile.css'
import { toast } from "react-hot-toast";
import defaultPic from "../../../pics/defaultPic.png"


function Profile() {
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [profilePic, setProfilePic] = useState("");
  const [username, setUsername] = useState("");
  const[name, setName] = useState("");

  const getUser = async () => {
    const res = await fetch(
      "http://127.0.0.1:3000/api/user/auth/getUser/?id=" + user_id,
      {
      headers: { "content-type": "application/json" ,
      token:token},
    }
      );
    const data = await res.json();
    console.log(data);

    if (data) {
      setUser(data);
      setProfilePic(data.profilePic);
      setUsername(data.username);
      setName(data.name);
      console.log(data);
    } else {
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    getUser();
  }, []);
console.log(profilePic)
  return (
    <div class="profile">Profile
  <div class="profile-container">
    
     
        <img src={profilePic === "" ? defaultPic : profilePic} width="200px" />
        <br/>
        <span>@{username}</span>
        <br/>
        <span>{name}</span>

      </div>

      
      
      
      </div>
  )
}

export default Profile