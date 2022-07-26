// in MessageParser.js
import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.includes('hello') || message.includes('hi')) {
      actions.handleHello();
    }
   else if (message.includes('remotes' ) || (message.includes('file'))) {
      actions.handleRemotes();
    }
    else if ((message.includes('save') ) || (message.includes('file'))) {
      actions.handleSave();
    }
    else if ((message.includes('download')) || (message.includes('file'))) {
      actions.handleDownload();
    }
    else if (message.includes('run') || message.includes('execute')) {
      actions.handleRun();
    }
    else if (message.includes('clear')) {
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