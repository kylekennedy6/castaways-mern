import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import InProgressGame from '../components/InProgressGame';
import Messenger from '../../messenger/components/Messenger/Messenger';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';

const MostRecentPrivateConversationGetter = () => {
  const gameId = useParams().gameId;
  const history = useHistory();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPrivateConversations = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/conversations/'
        );
        const mostRecentConversationId = responseData.conversations[0].id
        const path = `/${gameId}/private-chats/${mostRecentConversationId}`
        history.push(path);
      } catch (err) {}
    };
    fetchPrivateConversations();
  }, [sendRequest]);

  return (
    <InProgressGame>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
    </InProgressGame>
  );
};

export default MostRecentPrivateConversationGetter;
