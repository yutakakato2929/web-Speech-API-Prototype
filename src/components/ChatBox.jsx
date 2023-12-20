// ChatBox.js
import React from 'react';
import MessageDisplay from './MessageDisplay';
import InputField from './InputField';

const ChatBox = ({ messages, onSendMessage }) => {
  return (
    <div className="chat-box">
      <MessageDisplay messages={messages} />
      <InputField onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatBox;
