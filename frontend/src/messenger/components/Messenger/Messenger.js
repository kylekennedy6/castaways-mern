import React from 'react';
import ConversationList from '../ConversationList/ConversationList';
import MessageList from '../MessageList/MessageList';
import './Messenger.css';

const Messenger = props => {
  console.log(props)
    return (
      <div className="messenger">
        <div className="scrollable sidebar">
          <ConversationList opponents={props.opponents}/>
        </div>
        <div className="scrollable content">
          <MessageList />
        </div>
      </div>
    );
}

export default Messenger;