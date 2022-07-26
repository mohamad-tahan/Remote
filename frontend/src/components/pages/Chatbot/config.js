// in config.js
import { createChatBotMessage } from 'react-chatbot-kit';

const botName = 'RemoteBot';

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName} and I'm here to help you.`)],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },

};

export default config;
