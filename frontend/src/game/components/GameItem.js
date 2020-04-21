import React, { useState, useContext } from 'react';

import ContestantList from './ContestantList';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal.js';
import Island from '../../shared/components/UIElements/Island';
import { AuthContext } from '../../shared/context/auth-context';
import './GameItem.css';

const FULL_GAME = 4

const GameItem = props => {
  const auth = useContext(AuthContext);
  const [showIsland, setShowIsland] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openIslandHandler = () => setShowIsland(true);

  const closeIslandHandler = () => setShowIsland(false);

  return (
    <React.Fragment>
      <Modal
        show={showIsland}
        onCancel={closeIslandHandler}
        header={props.prize}
        contentClass="game-item__modal-content"
        footerClass="game-item__modal-actions"
        footer={<Button onClick={closeIslandHandler}>CLOSE</Button>}
      >
        <div className="game-container">
          <ContestantList items={props.contestants} />
        </div>
      </Modal>
      <li className="game-item">
        <Card classNName="game-item__content">
          <div className="game-item__info">
            <h2>{props.length}</h2>
            <h3>{props.status}</h3>
            <p>Waiting for {FULL_GAME - props.contestants.length} More Players</p>
          </div>
          <div className="game-item__actions">
            <Button inverse onClick={openIslandHandler}>
              GO TO ISLAND
            </Button>
            <Button to={`games/${props.id}`}>VIEW GAME LOG</Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default GameItem;
