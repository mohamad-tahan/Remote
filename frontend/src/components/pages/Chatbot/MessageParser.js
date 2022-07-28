// in MessageParser.js
import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.includes('hello') || message.includes('hi')) {
      actions.handleHello();
    }
   else if (message.includes('remote' ) ) {
      actions.handleRemotes();
    }
    else if ((message.includes('save') )) {
      actions.handleSave();
    }
    else if ((message.includes('download'))) {
      actions.handleDownload();
    }
    else if (message.includes('run') || message.includes('execute')) {
      actions.handleRun();
    }
    else if (message.includes('clear')|| message.includes('clean')) {
      actions.handleClear();
    }
    else if (message.includes('theme' )|| (message.includes('color'))) {
      actions.handleTheme();
    }
    else  if (message.includes('language' )) {
      actions.handleLanguage();
    }
    else if (message.includes('output' )) {
      actions.handleOutput();
    }
    else if (message.includes('input')) {
      actions.handleInput();
    }
    else{
      actions.handleNotFound();
    }
  };



  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;