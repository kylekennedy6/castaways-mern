import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Island from '../components/Island';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const InProgressGame = () => {
  const [loadedGame, setLoadedGame] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const gameId = useParams().gameId;

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/games/${gameId}`
        );
        setLoadedGame(responseData.game);
      } catch (err) {}
    };
    fetchGame();
  }, [sendRequest, gameId]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedGame && (
        <Island key={loadedGame.id}
        contestants={loadedGame.contestants} />
      )}
    </React.Fragment>
  );
};

export default InProgressGame;