import React, { useEffect, useState } from "react";
import "./Profile.css";
import { toast } from "react-hot-toast";
import defaultPic from "../../../pics/defaultPic.png";
import FileBase64 from "react-file-base64";
import Navbar from "../MainPage/Navbar";
import FileMap from "./FileMap";
import { MdModeEditOutline } from "react-icons/md";
import comp from "../../../pics/comp.png";
import character from "../../../pics/character.png";

function Profile() {
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [profilePic, setProfilePic] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [profilePressed, setProfilePressed] = useState(false);
  const [usernamePressed, setUsernamePressed] = useState(false);
  const [namePressed, setNamePressed] = useState(false);
  const [file, setFile] = useState("");
  const [pic, setPic] = useState("");

  const getUser = async () => {
    const res = await fetch("/auth/getUser/?id=" + user_id, {
      headers: { "content-type": "application/json", token: token },
    });
    const data = await res.json();

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
    const res = await fetch("/auth/getFilesbyUserId/?id=" + user_id, {
      headers: { "content-type": "application/json", token: token },
    });
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

  const deleteFile = async (myId) => {
    const res = await fetch("/auth/removeFile/?id=" + myId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          toast.success("Remote Deleted Successfully");
        }
      });
    getFiles();
  };

  const updateProfile = async (id) => {
    const res = await fetch("/auth/updateUser/?id=" + id, {
      method: "PUT",
      headers: { "content-type": "application/json", token: token },
      body: JSON.stringify({
        name: name,
        username: username,
        profilePic: pic,
      }),
    });

    const response = await res.json();
    localStorage.setItem("username", username);
    if (response) {
      setProfilePressed(false);
      setUsernamePressed(false);
      setNamePressed(false);
      toast.success(`Profile Updated`);
    } else {
      toast.error("Error Updating Profile");
    }
  };

  const getProfilepic = (files) => {
    setPic(files[0].base64);
  };
  useEffect(() => {}, [pic]);

  return (
    <div>
      <Navbar disable={true} />

      <div className="profile">
        <div className="character">
          <img src={character} className="character" />
        </div>
        <div class="profile-container">
          <div class="profile-pic">
            {pic && <img src={pic} width="400px" />}
            {!pic && (
              <img
                src={profilePic === "" ? defaultPic : profilePic}
                width="400px"
              />
            )}
            <br />
            {profilePressed ? (
              <div className="editimg">
                <div className="base64">
                  <FileBase64
                    multiple={true}
                    onDone={(e) => {
                      getProfilepic(e);
                    }}
                  />
                </div>

                <button
                  className="editInfo update"
                  onClick={(e) => {
                    updateProfile(user_id);
                  }}
                >
                  update
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="btn-editProfile"
                  onClick={(e) => setProfilePressed(!profilePressed)}
                >
                  Edit Profile Pic
                </button>
              </div>
            )}
            <br />
          </div>

          <div className="info">
            <h1>Profile Info</h1>

            <div className="user">
              {usernamePressed ? (
                <>
                  <span className="colorInfo">Username:</span>

                  <input
                    type="text"
                    placeholder={username}
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    onKeyPress={(e) =>
                      e.key === "Enter" && updateProfile(user_id)
                    }
                  />
                </>
              ) : (
                <>
                  <div className="colorInfo">Username:</div>
                  <span>@{username}</span>
                </>
              )}
              <MdModeEditOutline
                className="btn-edit"
                onClick={(e) => setUsernamePressed(!usernamePressed)}
              />
            </div>

            <div className="name">
              {namePressed ? (
                <>
                  <span className="colorInfo">Name:</span>

                  <input
                    type="text"
                    placeholder={name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && updateProfile(user_id)
                    }
                  />
                </>
              ) : (
                <>
                  <div className="colorInfo">Name: </div>
                  <br />
                  <span> {name}</span>
                </>
              )}
              <br />
              <MdModeEditOutline
                className="btn-edit"
                onClick={(e) => setNamePressed(!namePressed)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="file-pic">
        <div class="file-container">
          <h1>My Remotes</h1>
          <div class="fileList">
            {file &&
              file.map((i, index) => {
                return (
                  <FileMap
                    i={i}
                    key={i._id}
                    id={i._id}
                    name={i.name}
                    deleteFile={() => deleteFile(i._id)}
                  />
                );
              })}
          </div>
        </div>
        <div>
          <img src={comp} className="laptop" />
        </div>
      </div>
    </div>
  );
}

export default Profile;
