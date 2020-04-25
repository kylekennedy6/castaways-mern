import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import './Chat.css';

let socket;

const Chat = props => {
  const [nickname, setNickname] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:8080';
  console.log(messages);

  useEffect(() => {
    const {nickname, room, contestantId } = props;
    console.log(room)
    socket = io(ENDPOINT);

    setNickname(nickname);

    socket.emit('join', { nickname, room, contestantId }, error => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, props]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = event => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={'Tribe Chat'} />
        <Messages messages={messages} nickname={nickname} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
