import React, { useState } from 'react';

import ContestantList from '../contestants/ContestantList';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal.js';
import './GameItem.css';

const FULL_GAME = 4;

const GameItem = props => {
  return (
    <React.Fragment>
      <li className="game-item">
        <Card classNName="game-item__content">
          <div className="game-item__info">
            <h2>{props.length}</h2>
            <h3>{props.status}</h3>
            {props.status === 'Matchmaking' && (
              <p>
                Waiting for {FULL_GAME - props.contestants.length} More Players
              </p>
            )}
            {props.status === 'In Progress' && (
              <p>{props.contestantsRemaining.length} Players Remaining</p>
            )}
          </div>
          <div className="game-item__actions">
            <Button inverse to={`/${props.id}/activity-feed/`}>
              GO TO ISLAND
            </Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default GameItem;
