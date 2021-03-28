import React, { useState } from 'react';
import { InputText } from '../../component/InputText';
import { Messages } from '../../component/Messages';

const baseURL = 'ws://localhost:8080/chat';

export const Chat = () => {
  const [chat, setChat] = useState([]);

  const [user, setUser] = useState({
    ws: undefined,
    username: '',
    message: '',
  });

  const setUserName = (value) => {
    setUser({
      ...user,
      username: value,
    });
  };

  const setMessage = (value) => {
    setUser({
      ...user,
      message: value,
    });
  };

  const enterChat = () => {
    let ws = new WebSocket(baseURL + `?username=${user.username}`);

    ws.onopen = (evt) => {
      console.log('WebSocket opened!', { evt });
    };

    ws.onclose = (evt) => {
      console.log('WebSocket closed!', { evt });
    };

    ws.onmessage = (message) => {
      console.log('WebSocket message: ', { message });

      let result = chat.concat([JSON.parse(message.data)]);
      setChat(result);
    };

    ws.onerror = (error) => {
      console.log('WebSocket error: ', { error });
    };

    setUser({
      ...user,
      ws,
    });
  };

  const sendMessage = () => {
    const { ws, message } = user;

    ws.send(message);
    setUser({
      ...user,
      message: '',
    });
  };

  return (
    <div className="chat">
      <h1>Web Chat</h1>
      {user.ws && <Messages messages={chat} />}
      <div className="chat-inputs">
        <InputText
          placeholder={user.ws ? 'Write message' : 'Enter with your username'}
          onChange={(value) => (user.ws ? setMessage(value) : setUserName(value))}
          defalutValue={user.ws ? user.message : user.username}
        />
        <button type="button" onClick={() => (user.ws ? sendMessage() : enterChat())}>
          {user.ws ? 'Send' : 'Enter'}
        </button>
      </div>
    </div>
  );
};
