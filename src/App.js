import './App.css';
import ChatBox from './components/ChatBox';
import React, { useEffect, useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    var storedMessages = []
    for(let i = 0 ; i < localStorage.length ; i++) {
      let getVal = localStorage.getItem(String(i))
      try {
        let getData = JSON.parse(getVal)
        storedMessages.push(getData)
      } catch(e){
        console.log(e)
      }
    }
    setMessages(() => {
      return storedMessages
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSendMessage = (message) => {

    const data = {
      'from': message.from,
      'text': message.text
    };
    const val = JSON.stringify(data);
    localStorage.setItem(localStorage.length, val);
    
    setMessages((prevMessages) => {
      return [...prevMessages, {from: message.from, text:message.text}]
    })
  };

  return (
    <div className="App">
      <ChatBox messages={messages} onSendMessage={onSendMessage}/>
    </div>
  );
}

export default App;
