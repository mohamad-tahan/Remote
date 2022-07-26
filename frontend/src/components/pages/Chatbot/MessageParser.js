// in MessageParser.js
import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.includes('hello')) {
      actions.handleHello();
    }
    if (message.includes('run')) {
      actions.handleRun();
    }
    if ((message.includes('download')) || (message.includes('file'))) {
      actions.handleDownload();
    }
    if (message.includes('clear')) {
      actions.handleClear();
    }
    if ((message.includes('save') ) || (message.includes('file'))) {
      actions.handleSave();
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