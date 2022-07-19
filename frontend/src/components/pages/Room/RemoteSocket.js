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
            toast.error("Socket Connection Failed, Try Again Later.");
            nav("/");
        }

      
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
