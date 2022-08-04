import React from "react";
import { VscRunAll } from "react-icons/vsc";
import { BsSaveFill } from "react-icons/bs";
import { BsFillSunFill } from "react-icons/bs";
import { HiDocumentDownload } from "react-icons/hi";
import { AiOutlineClear } from "react-icons/ai";

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
        Type your code then press on <VscRunAll /> to run it.
      </>
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleDownload = () => {
    const botMessage = createChatBotMessage(
      <>
        Press on <HiDocumentDownload /> to download your file to your pc.
      </>
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleClear = () => {
    const botMessage = createChatBotMessage(
      <>
        Press on <AiOutlineClear /> to clear your code.
      </>
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleSave = () => {
    const botMessage = createChatBotMessage(
      <>
        Press on <BsSaveFill /> to save your remote.
      </>
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleTheme = () => {
    const botMessage = createChatBotMessage(
      <>
        Press on <BsFillSunFill /> to switch between dark and light mode.
      </>
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleRemotes = () => {
    const botMessage = createChatBotMessage(
      <>Press on My Remotes dropdown to see your remotes.</>
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleLanguage = () => {
    const botMessage = createChatBotMessage(
      <>Press on Language dropdown to choose a language.</>
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleOutput = () => {
    const botMessage = createChatBotMessage(
      <>See the output of your code in the output section.</>
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleInput = () => {
    const botMessage = createChatBotMessage(
      <>Type the input you want to run in the input section.</>
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleNotFound = () => {
    const botMessage = createChatBotMessage(
      <>Sorry, I didn't understand that.</>
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
            handleDownload,
            handleClear,
            handleSave,
            handleTheme,
            handleRemotes,
            handleLanguage,
            handleOutput,
            handleInput,
            handleNotFound,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
