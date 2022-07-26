// in config.js
import { createChatBotMessage } from 'react-chatbot-kit';

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
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
  customComponents: {
    // Replaces the default header
   header: () => <div style={{ backgroundColor: 'purple', padding: "5px", borderRadius: "3px" }}>RemoteBot</div>,
  //  // Replaces the default bot avatar
  //  botAvatar: (props) => <MyAvatar {...props} />,
  //  // Replaces the default bot chat message container
  //  botChatMessage: (props) => <MyCustomChatMessage {...props} />,
  //  // Replaces the default user icon
  //  userAvatar: (props) => <MyCustomAvatar {...props} />,
  //  // Replaces the default user chat message
  //  userChatMessage: (props) => <MyCustomUserChatMessage {...props} />
 },
};

export default config;
