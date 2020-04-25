import React from 'react';

import Message from './Message/Message';

import './Messages.css';

const Messages = ({ messages, nickname }) => (
  <div className="messages">
    {messages.map((message, i) => <Message message={message} nickname={nickname}/>)}
  </div>
);

export default Messages;