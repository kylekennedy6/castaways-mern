import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import InProgressGame from '../game/InProgressGame';
import Chat from '../chat/Chat/Chat';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

const TribeChat = () => {
  const [loadedContestant, setLoadedContestant] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const gameId = useParams().gameId;
  const auth = useContext(AuthContext);
  useEffect(() => {
    const fetchContestant = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/contestants/contestant/${gameId}/${auth.userId}`
        )
        setLoadedContestant(responseData.contestant);
      } catch (err) {}
    };
    fetchContestant();
  }, [sendRequest, auth.userId]);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <InProgressGame>
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && loadedContestant && (
          <Chat
            key={loadedContestant.id}
            contestantId={loadedContestant.id}
            nickname={loadedContestant.nickname}
            room={gameId}
          />
        )}
      </InProgressGame>
    </React.Fragment>
  );
};

export default TribeChat;
