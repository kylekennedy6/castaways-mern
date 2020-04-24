import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import ConversationSearch from '../ConversationSearch/ConversationSearch';
import ConversationListItem from '../ConversationListItem/ConversationListItem';
import Toolbar from '../Toolbar/Toolbar';
import ToolbarButton from '../ToolbarButton/ToolbarButton';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/context/auth-context';

import './ConversationList.css';

const ConversationList = props => {
  const auth = useContext(AuthContext);
  const gameId = useParams().gameId;
  const newConversationMode =
    window.location.href.split('private-chats')[1] === '/new';
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [showNewConversation, setShowNewConversation] = useState(false);
  const history = useHistory();

  const newConversation = {
    nickname: 'New message',
    avatar:
      'https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png',
    text: '',
  };

  const newConversationHandler = async event => {
    event.preventDefault();
    if (!showNewConversation) {
      setShowNewConversation(true);
      try {
        await sendRequest(
          'http://localhost:5000/api/conversations/',
          'POST',
          null,
          {
            Authorization: 'Bearer ' + auth.token,
            'Content-Type': 'application/json',
          }
        );
        history.push('/');
      } catch (err) {}
    }
  };

  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    getConversations();
  }, []);

  const getConversations = () => {
    console.log(props)
    let newConversations = props.items.map(conversation => {
      return {
        id: conversation.id,
        nickname: conversation.participants[0].nickname,
        avatar: conversation.participants[0].avatar,
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
            to={`/${gameId}/private-chats/new`}
          />,
        ]}
      />
      <ConversationSearch />
      <nav className="conversation-nav">
        <ul className="conversation-list">
          {newConversationMode && (
            <ConversationListItem key="new" data={newConversation} />
          )}
          {conversations.map(conversation => (
            <ConversationListItem
              key={conversation.nickname}
              data={conversation}
              onDelete={props.onDeleteConversation}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ConversationList;
