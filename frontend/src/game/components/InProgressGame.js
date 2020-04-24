import React from 'react';

import GameDashboard from '../components/GameDashboard';
import './InProgressGame.css';

const InProgressGame = props => {
  return (
    <div className="game-container">
      <GameDashboard />
      <div className="dashboard-item-container">
        {props.children}
      </div>
    </div>
  );
};

export default InProgressGame;
