// InputField.js
import React, { useState } from 'react';

const InputField = ({ onSendMessage }) => {

  const [inputText, setInputText] = useState('');
  const [recogniziedText, setRecogniziedText] = useState('');

  // 止める方法不明
  // let stopFlag

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new SpeechRecognition();
  // 言語設定を日本語に
  recognition.lang = 'ja-JP';
  // 解析中の結果を表示する
  recognition.interimResults = true;
  // 認識のたびに継続的に結果を返す
  recognition.continuous = true;

  recognition.onend = () => {
    console.log('Audio capturing will be continued');
    recognition.start();
    return;
    // if (stopFlag === false){
    //   console.log('Audio capturing will be continued');
    //   recognition.start();
    //   return;
    // }else {
    //   console.log('Audio capturing will be end');
    //   return;
    // }
  }
  recognition.onaudiostart = () => {
    console.log('Audio capturing started onaudiostart')
  }
  recognition.onaudioend = () => {
    console.log("Audio capturing ended onaudioend");
  }
  recognition.error = (event) => {
    console.log('エラーが発生しました。', event.error)
  }
  recognition.onnomatch = () => {
    console.log('認識できませんでした。')
  }

  const sendMessage = () => {
    console.log('sendMessage')
    let text = document.getElementById('recognizedText').value
    if (text){
      onSendMessage({ from: 'user', text: text })
      sendMessageToAI(text)
      setRecogniziedText(() => {
        return ''
      })
    }
  }

  let recognizeFlag = false
  //認識した文字の処理
  recognition.onresult = (event) => {
    for (let i = event.resultIndex; i < event.results.length; i++) {
      let results = event.results
      if (results[i].isFinal) {
        //入力欄の値を初期化
        setInputText(() => {
          return ''
        })
        console.log('認識完了')
        if (event.results[i][0].transcript.includes('開始')){
          recognizeFlag = true
          continue
        } else if(event.results[i][0].transcript.includes('終わり')){
          recognizeFlag = false
          sendMessage()
        }
        if (recognizeFlag){
          setRecogniziedText((text) => text + event.results[i][0].transcript)
        }
      } else {
        console.log('認識中')
        setInputText(event.results[i][0].transcript)
      }
    }
    
  }

  //ChatGPT-APIの呼び出し関数
  const sendMessageToAI = (message) => {
    // APIの呼び出し

    //処理詳細

    // レスポンスの受け取り
    const response = 'APIの返り値'
    onSendMessage({ from: 'bot', text: response})
  };

  const deleteLocalStorage = () => {
    console.log('ローカルストレージのクリア')
    localStorage.clear()
    window.location.reload()
  }

  const deleteInputText = () => {
    console.log('入力内容のクリア')
    setRecogniziedText(() => {
      return ''
    })
  }

  // const stopGetMessage = () => {
  //   console.log('音声取得ストップ');
  //   recognition.stop();
  //   stopFlag = true
  //   return;
  // }

  const startGetMessage = () => {
    // stopFlag = false
    //音声認識を開始する
    recognition.start();
  }

  return (
    <div className="input-field">
      <textarea id='recognizedText' type="text" rows='5' value={recogniziedText + inputText} />
      <button onClick={startGetMessage}>Start</button>
      <button onClick={deleteInputText}>input Clear</button>
      <button onClick={deleteLocalStorage}>All Clear</button>
    </div>
  );
};

export default InputField;