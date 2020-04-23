import React, { useState, useEffect, useContext } from 'react';
import ConversationSearch from '../ConversationSearch/ConversationSearch';
import ConversationListItem from '../ConversationListItem/ConversationListItem';
import Toolbar from '../Toolbar/Toolbar';
import ToolbarButton from '../ToolbarButton/ToolbarButton';
import axios from 'axios';

import { AuthContext } from '../../../shared/context/auth-context';
import './ConversationList.css';

const ConversationList = props => {
  const auth = useContext(AuthContext);
  const opponents = props.opponents.filter(c => c.user !== auth.userId);

  const [showNewConversation, setShowNewConversation] = useState(false);

  const newConversation = {
    nickname: 'New message',
    avatar:
      'https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png',
    text: '',
  };

  const newConversationHandler = () => {
    if (!showNewConversation) {
      setShowNewConversation(true);
    }
  };



  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    getConversations();
  }, []);

  //  const getConversations = () => {
  //     axios.get('https://randomuser.me/api/?results=20').then(response => {
  //         let newConversations = response.data.results.map(result => {
  //           return {
  //             photo: result.picture.large,
  //             name: `${result.name.first} ${result.name.last}`,
  //             text: 'Hello world! This is a long message that needs to be truncated.'
  //           };
  //         });
  //         setConversations([...conversations, ...newConversations])
  //     });
  //   }

  const getConversations = () => {
    let newConversations = opponents.map(contestant => {
      return {
        nickname: contestant.nickname,
        avatar: contestant.avatar,
        text: 'Snippet text',
      };
    });
    setConversations([...conversations, ...newConversations]);
  };

  return (
    <div className="conversation-list">
      <Toolbar
        title="Contestants"
        leftItems={
          [
            // <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]
        }
        rightItems={[
          <ToolbarButton
            key="add"
            icon="ion-ios-add-circle-outline"
            onClick={newConversationHandler}
          />,
        ]}
      />
      <ConversationSearch />
      {showNewConversation && (
        <ConversationListItem key="new" data={newConversation} />
      )}
      {conversations.map(conversation => (
        <ConversationListItem key={conversation.nickname} data={conversation} />
      ))}
    </div>
  );
};

export default ConversationList;
