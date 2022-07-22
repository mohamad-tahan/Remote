import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import Remote from "../../pages/Ide/Remote";
import { initSocket } from "../../../socket";
import { useNavigate, useParams } from "react-router-dom";
import UserRoom from "./UserRoom";
import logo from "../../../pics/logoSpin.png";
import "./RoomSocket.css";

const RemoteSocket = () => {
  const username = localStorage.getItem("username");
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const { roomId } = useParams();
  const [users, setUsers] = useState([]);
  let nav = useNavigate();
  const [profilePic, setProflePic] = useState("");
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");

  console.log(profilePic);

  const getUserProfile = async () => {
    const res = await fetch(
      "http://127.0.0.1:3000/api/user/auth/getUser/?id=" + user_id,
      {
        headers: { "content-type": "application/json", token: token },
      }
    );
    const data = await res.json();
    // console.log(data);

    if (data) {
      setProflePic(data.profilePic);
    } else {
      toast.error("Something went wrong.");
    }
  };

  console.log("profile", profilePic);

  const init = async () => {
    socketRef.current = await initSocket();
    socketRef.current.on("connect_error", (err) => handleErrors(err));
    socketRef.current.on("connect_failed", (err) => handleErrors(err));

    function handleErrors(e) {
      toast.error("Socket Connection Failed.");
    
    }
    socketRef.current.emit("join", {
      roomId: roomId,
      username: username,
      profilePic: profilePic,
    });

    // Listening for joined users
    socketRef.current.on("joined", ({ users, username, socketId, profilePic }) => {
    
      setUsers(users);
      if (username !== localStorage.getItem("username")) {
        toast.success(username + " Joined The Room.");
      }
      setUsers(users);
      //  setUserProfile(profilePic);
      socketRef.current.emit("codeSocket", {
        code: codeRef.current,
        socketId,
      });
    });
    //display profile pic of user
    socketRef.current.on("joined", ({ profilePic }) => {
      setProflePic(profilePic);
    });
    // Listening for disconnected Users
    socketRef.current.on("disconnected", ({ socketId, username }) => {
      toast.error(username + " Left The Room.");
      setUsers((leftUsers) => {
        return leftUsers.filter((user) => user.socketId !== socketId);
      });
    });
  };

  useEffect(() => {
    getUserProfile();
  }, [profilePic]);

  useEffect(() => {
    init();

    return () => {
      socketRef.current?.disconnect();
      socketRef.current?.off("joined");
      socketRef.current?.off("disconnected");
    };
  }, []);

  console.log(users);

  return (
    <div>
      <div className="roomNav">
        <div className="img">
          <img src={logo} width="60px"></img>
        </div>
        <div className="joinedUsers">
          {users.map((user) => (
            <UserRoom username={user.username} profilePic={user.profilePic} />
          ))}
        </div>
      </div>

      <Remote socketRef={socketRef} roomId={roomId} />
    </div>
  );
};

export default RemoteSocket;
