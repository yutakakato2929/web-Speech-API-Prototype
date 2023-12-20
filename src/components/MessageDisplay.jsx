// MessageDisplay.js
import React from 'react';

const MessageDisplay = ({ messages }) => {
  return (
    <div className="message-display">
      {messages.map((message, index) => (
        <div key={index} className={message.from === 'user' ? 'user-message' : 'bot-message'}>
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default MessageDisplay;
