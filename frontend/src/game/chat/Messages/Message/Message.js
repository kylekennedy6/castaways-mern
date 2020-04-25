import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, nickname }) => {
  const trimmedName = nickname.trim().toLowerCase();
  const mineTag = (user === trimmedName) ? 'mine' : '';

  return (
    <div className={`message ${mineTag}`}>
      <div className="bubble-container">
        <div className="bubble">{ReactEmoji.emojify(text)}</div>
      </div>
    </div>
  );
};

export default Message;
