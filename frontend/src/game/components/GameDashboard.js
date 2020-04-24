import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './GameDashboard.css';

const GameDashboard = () => {
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
      <nav className="game-dashboard__nav">
        <ul className="game-dashboard-links">
          <li>
            <NavLink to={`/${gameId}/activity-feed/`}>Activity Feed</NavLink>
          </li>
          <li>
            <NavLink to={`/${gameId}/tribe-chat/`}>Tribe Chat</NavLink>
          </li>
          <li>
            <NavLink to={`/${gameId}/private-chats/`}>Private Chats</NavLink>
          </li>
          <li>
            <NavLink to={`/${gameId}/tribe-stats/`}>Tribe Stats</NavLink>
          </li>
        </ul>
      </nav>
  );
};

export default GameDashboard;
