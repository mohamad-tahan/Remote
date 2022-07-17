import React, { useState } from 'react';
import logo from '../../../pics/logoSpin.png'
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './GenerateRoomId.css'

const GenerateRoomId = () => {
    const nav = useNavigate();
    const [roomId, setRoomId] = useState('');

    console.log(roomId);
    const generateRoomId = (e) => {
        e.preventDefault();
        const id = uuidv4();
        setRoomId(id);
        toast.success('Room Id Generated');
    };

    const joinRoom = () => {
        if (!roomId ) {
            toast.error('Room id is Required');
            return;
        }
        nav("/remote/"+roomId)
    };

const handleClose = ()=>{
    nav('/')
}
    
return (
    <div className="roomModal">
    <div className="showRoomModal">

      <div className="generateId">
        <span onClick={handleClose} className="close">
          &times;
        </span>
        <div className="top">
          <img src={logo} width="50px" height="50px" />
          <p className="title">Generate Room Id</p>
        </div>
        <div className="roomBox">
          <input
            type="text"
            placeholder="Room Id"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <br />

          <button className="btn-joinRoom" onClick={joinRoom}>
            Join Room
          </button>
          <br />

          <div className="generate">Can't think of an id?  &nbsp;
                        <a onClick={generateRoomId} href="">
                          Generate One
                        </a>
                    </div>
          
        </div>
      </div>
    </div>
    </div>
  );

};

export default GenerateRoomId;
