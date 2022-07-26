// in config.js
import { createChatBotMessage } from 'react-chatbot-kit';
import MyAvatar from './MyAvatar';
import "./Chatbot.css"
import { FaRobot } from "react-icons/fa";

const botName = 'RemoteBot';

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName} and I'm here to help you.`),
  createChatBotMessage(<>To start coding, you have to:<br/>
  1. Join a Room <br/>
  2. Create a Remote<br/>
  3. Write your Code
  </>),
  createChatBotMessage(`Enjoy!`)],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#1e1e1e',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
  customComponents: {
   header: () => <div className='headerBot'>RemoteBot</div>,
   botAvatar: () => <FaRobot className='robotIcon' />,
   userAvatar: () => <MyAvatar />,
 },
};

export default config;
