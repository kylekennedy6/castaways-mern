import React from 'react';
import ConversationList from '../ConversationList/ConversationList';
import MessageList from '../MessageList/MessageList';
import './Messenger.css';

const Messenger = props => {
    return (
      <div className="messenger">
        <div className="scrollable sidebar">
          <ConversationList items={props.items} onDeleteConversation={props.onDeleteConversation} newConversation={props.newConversation} />
        </div>
        <div className="scrollable content">
          <MessageList contestants={props.contestants} />
        </div>
      </div>
    );
}

export default Messenger;