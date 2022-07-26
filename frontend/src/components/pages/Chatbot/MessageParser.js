// in MessageParser.js
import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.includes('hello')) {
      actions.handleHello();
    }
    if (message.includes('remotes' ) || (message.includes('file'))) {
      actions.handleRemotes();
    }
    if ((message.includes('save') ) || (message.includes('file'))) {
      actions.handleSave();
    }
    if ((message.includes('download')) || (message.includes('file'))) {
      actions.handleDownload();
    }
    if (message.includes('run')) {
      actions.handleRun();
    }
    if (message.includes('clear')) {
      actions.handleClear();
    }
    if (message.includes('theme' )|| (message.includes('color'))) {
      actions.handleTheme();
    }
    if (message.includes('language' )) {
      actions.handleLanguage();
    }
    if (message.includes('output' )) {
      actions.handleOutput();
    }
    if (message.includes('input')) {
      actions.handleInput();
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