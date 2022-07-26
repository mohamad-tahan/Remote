import React, { useState } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./config.js"
import MessageParser from "./MessageParser.js";
import ActionProvider from "./ActionProvider.js";
import './Chatbot.css'
import Draggable from 'react-draggable';
import { GiVintageRobot } from "react-icons/gi";




const MyChatbot = () => {
  const[isOpen, setIsOpen] = useState(false);

  return (
    <div className="chat">
      
       <div>
       <Draggable>
      <GiVintageRobot className="robotIcon2" onClick={() => setIsOpen(!isOpen)} />
      </Draggable>
    </div>
      <Draggable>
        <div className={`chatbot   ${isOpen && "chatbotHide"}` }>
          {isOpen && ( 
             <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
      )}
      
          </div>
          
      </Draggable>
     
    </div>
  );
};
export default MyChatbot;
