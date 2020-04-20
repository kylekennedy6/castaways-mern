import React from 'react';
import { useParams } from 'react-router-dom';

import GameList from '../components/GameList';

const DUMMY_GAMES = [
  {
    id: 'g3',
    length: 30,
    status: 'In Progress',
    prize: 10,
    players: [
      'u1',
      'u2',
    ]
  },
  {
    id: 'g2',
    length: 30,
    status: 'Concluded',
    prize: 10,
    players: [
      'u1', 'u2'
    ]
  },
  {
    id: 'g1',
    length: 30,
    status: 'Concluded',
    prize: 10,
    players: [
      'u2', 'u3'
    ]
  },
];

const UserGames = () => {
  const userId = useParams().userId;
  const loadedGames = DUMMY_GAMES.filter(game =>game.players.includes(userId))
  return <GameList items={loadedGames} />;
};

export default UserGames;
