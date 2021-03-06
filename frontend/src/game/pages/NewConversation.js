import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import InProgressGame from '../game/InProgressGame';
import Messenger from '../../messenger/components/Messenger/Messenger';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';

const NewConversation = () => {
  const gameId = useParams().gameId;
  const [loadedContestants, setLoadedContestants] = useState();
  const [
    loadedPrivateConversations,
    setLoadedPrivateConversations,
  ] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPrivateConversations = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/conversations/'
        );
        setLoadedPrivateConversations(responseData.conversations);
      } catch (err) {}
    };
    fetchPrivateConversations();
  }, [sendRequest]);

  useEffect(() => {
    const fetchContestants = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/contestants/${gameId}`
        );
        setLoadedContestants(responseData.contestants);
      } catch (err) {}
    };
    fetchContestants();
  }, [sendRequest]);

  const conversationDeletedHandler = deletedConversationId => {
    setLoadedPrivateConversations(prevConversations =>
      prevConversations.filter(
        conversation => conversation.id !== deletedConversationId
      )
    );
  };

  return (
    <InProgressGame>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPrivateConversations && (
        <Messenger
          key={gameId}
          items={loadedPrivateConversations}
          contestants={loadedContestants}
          onDeleteConversation={conversationDeletedHandler}
        />
      )}
    </InProgressGame>
  );
};

export default NewConversation;
