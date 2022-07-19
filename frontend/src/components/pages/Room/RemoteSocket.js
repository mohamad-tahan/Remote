import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import Remote from "../../pages/Ide/Remote";
import { initSocket } from "../../../socket";
import {useNavigate,useParams} from "react-router-dom";

const RemoteSocket = () => {
  const username = localStorage.getItem("username");
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const { roomId } = useParams();
  const [users, setUsers] = useState([]);
  let nav = useNavigate();
  
    const init = async () => {
        socketRef.current = await initSocket();
        socketRef.current.on('connect_error', (err) => handleErrors(err));
        socketRef.current.on('connect_failed', (err) => handleErrors(err));
        

        function handleErrors(e) {
            toast.error("Socket Connection Failed.");
            // nav("/");
        }
        socketRef.current.emit("join", {
          roomId,
          username:username,
      });
       // Listening for joined users
       socketRef.current.on(
        "joined",({ users, username, socketId }) => {
             if (username !== localStorage.getItem("username")) {
                 toast.success(username+" Joined The Room.");
             }
             setUsers(users);
             socketRef.current.emit("codeSocket", {
                 code: codeRef.current,
                 socketId,
             });
         }
     );
     // Listening for disconnected Users
     socketRef.current.on(
      "disconnected",
      ({ socketId, username }) => {
          toast.error(username+" Left The Room.");
          setUsers((leftUsers) => {
           
              return leftUsers.filter(
                  (user) => user.socketId !== socketId
              );
              
          });
      }
  );

      
    };

    useEffect(() => {
    init();
    return () => {
        socketRef.current?.disconnect();
        socketRef.current?.off("joined");
        socketRef.current?.off("disconnected");
    };
}, []);

  return (
      <div >
        <Remote
          socketRef={socketRef}
          roomId={roomId}
          
        />
      </div>
  );
};

export default RemoteSocket;
