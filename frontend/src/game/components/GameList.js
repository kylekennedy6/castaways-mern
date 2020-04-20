import React from 'react';

import GameItem from './GameItem';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import './GameList.css';

const GameList = props => {
  if (props.items.length === 0) {
    return (
      <div className="game-list center">
        <Card>
          <h2>No games found.</h2>
          <Button to="/game/new-game">Find New Game</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="game-list">
      {props.items.map(game => (
        <GameItem
          key={game.id}
          length={game.type}
          status={game.status}
          prize={game.prize}
          players={game.players}
        />
      ))}
    </ul>
  );
};

export default GameList;
