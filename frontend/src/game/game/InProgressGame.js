import React from 'react';

import GameDashboard from '../navigation/GameDashboard';
import './InProgressGame.css';

const InProgressGame = props => {
  return (
    <div id="game-container">
      <GameDashboard />
      <div className="dashboard-item-container">
        {props.children}
      </div>
    </div>
  );
};

export default InProgressGame;
