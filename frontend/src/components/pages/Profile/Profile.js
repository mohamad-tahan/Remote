import React, { useEffect, useState } from "react";
import "./Profile.css";
import { toast } from "react-hot-toast";
import defaultPic from "../../../pics/defaultPic.png";
import { TbBrandJavascript, TbPlayerStop } from "react-icons/tb";
import { FaPython } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import FileBase64 from "react-file-base64";
import Navbar from "../MainPage/Navbar";
import Test from "./Test";
import FileMap from "./FileMap";


function Profile() {
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [profilePic, setProfilePic] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [pressed, setPressed] = useState(false);
  const [profilePressed, setProfilePressed] = useState(false);
  const [file, setFile] = useState("");
  const[fileName,setFileName] = useState("");
  const [pic, setPic] = useState("");

  const getUser = async () => {
    const res = await fetch(
      "http://127.0.0.1:3000/api/user/auth/getUser/?id=" + user_id,
      {
        headers: { "content-type": "application/json", token: token },
      }
    );
    const data = await res.json();
    // console.log(data);

    if (data) {
      setUser(data);
      setProfilePic(data.profilePic);
      setUsername(data.username);
      setName(data.name);
    } else {
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const getFiles = async () => {
    const res = await fetch(
      "http://127.0.0.1:3000/api/user/auth/getFilesbyUserId/?id=" + user_id,
      {
        headers: { "content-type": "application/json", token: token },
      }
    );
    const data = await res.json();

    if (data) {
      setFile(data);
    } else {
      toast.error("Something went wrong.");
    }
  };
  useEffect(() => {
    getFiles();
  }, []);

  const deleteFile = async (id) => {
    console.log(id);

    const res = await fetch(
      "http://localhost:3000/api/user/auth/removeFile/?id=" + id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res) {
          toast.success("Remote Deleted Successfully");
        }
        getFiles();
      });
  };



  const updateProfile = async (id) => {
    const res = await fetch(
      "http://127.0.0.1:3000/api/user/auth/updateUser/?id=" + id,
      {
        method: "PUT",
        headers: { "content-type": "application/json", token: token },

        body: JSON.stringify({
          name: name,
          username: username,
          profilePic: pic,
        }),
      }
    );
    const response = await res.json();
    console.log(response);
    if (response) {
      setProfilePressed(false);
      toast.success(`Profile Updated`);
    } else {
      toast.error("Error Updating Profile");
    }
  };
  
  
  
  const getProfilepic = (files) => {
    console.log(files[0].base64)
    setPic(files[0].base64); 
  };

  useEffect(() => {
    getUser();
  } , [user]);


  return (
    <div>
      <Navbar/>

    <div class="profile">
      <div class="profile-container">
        <div class="profile-pic">
        <img src={profilePic === "" ? defaultPic : profilePic} width="180px" />
        <br />
        <button className="btn-editProfile">Edit Profile Pic</button>
        </div>
        <div className="info">
        <span>Username: @{username}</span>
        <br />
        <span>Name: {name}</span>
        <br />
        <button class="editInfo" onClick={(e) => setProfilePressed(!profilePressed)}>
         Edit Info
        </button>
        </div>
        </div>
      
        {profilePressed && ( <div class="edit-container">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <FileBase64
          multiple={true}
          onDone={(e) => {
            getProfilepic(e);
          }}
        />
          <button onClick={() => updateProfile(user_id)}>Update</button>
        </div>)}
    


      <div class="file-container">
        <h1>My Remotes</h1>
        {file &&
          file.map((i, index) => {
            return (
           
              <FileMap
                i={i}
                key={index}
                id={i._id}
                name={i.name}
                deleteFile={deleteFile}
               
              />
              

            
            );
          })}
      </div>
    </div>
    </div>
   

  );
}

export default Profile;
