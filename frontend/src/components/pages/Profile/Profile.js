import React, { useEffect, useState } from "react";
import "./Profile.css";
import { toast } from "react-hot-toast";
import defaultPic from "../../../pics/defaultPic.png";
import { TbBrandJavascript, TbPlayerStop } from "react-icons/tb";
import { FaPython } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

function Profile() {
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [profilePic, setProfilePic] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const [file, setFile] = useState("");

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
    console.log(data);

    if (data) {
      setFile(data);
    } else {
      toast.error("Something went wrong.");
    }
  };
  useEffect(() => {
    getFiles();
  }, [file]);

  const deleteFile = async (id) => {
    console.log(id);

    const res = await fetch("http://localhost:3000/api/user/auth/removeFile/?id=" + id,{
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  token: token,
                },
        }
        ) 
        .then(res=>res.json())
        .then(res=>{
            console.log(res);
            if(res){
              console.log("Deleted")
              toast.success("File Deleted Successfully")
            }
            getFiles()
            
        })
}

  return (
    <div class="profile">
      <div class="profile-container">
        <img src={profilePic === "" ? defaultPic : profilePic} width="200px" />
        <br />
        <span>@{username}</span>
        <br />
        <span>{name}</span>
      </div>

      <div class="file-container">
        <h1>My Remotes</h1>
        {file &&
          file.map((i, index) => {
            return (
              <div className="files" key={i._id} value={i._id}>
                {i.language === "js" ? (
                  <TbBrandJavascript className="js" />
                ) : (
                  <FaPython className="py" />
                )}{" "}
                {i.name}
                <div className="edit-delete">
                  <MdModeEditOutline className="editIcon" />{" "}
                  <MdDeleteForever className="deleteIcon"  onClick={(e)=>deleteFile(i._id)}/>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Profile;
