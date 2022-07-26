import React from "react";
import { VscRunAll } from "react-icons/vsc";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage("Hello. Nice to meet you.");

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleRun = () => {
    const botMessage = createChatBotMessage(
      <>
        Type your code then press on  <VscRunAll/> to run it.
      </>
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleRun,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
