import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import GameList from '../components/GameList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';


const UserGames = () => {
  const [loadedGames, setLoadedGames] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/games/user/${userId}`
        );
        setLoadedGames(responseData.games);
      } catch (err) {}
    };
    fetchGames();
  }, [sendRequest, userId]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedGames && (
        <GameList items={loadedGames} />
      )}
    </React.Fragment>
  );
};

export default UserGames;

