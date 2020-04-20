import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal.js';
import Island from '../../shared/components/UIElements/Island';
import { AuthContext } from '../../shared/context/auth-context';
import './GameItem.css';

const GameItem = props => {
  const auth = useContext(AuthContext);
  const [showIsland, setShowIsland] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openIslandHandler = () => setShowIsland(true);

  const closeIslandHandler = () => setShowIsland(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log('DELETING...');
  };

  return (
    <React.Fragment>
      <Modal
        show={showIsland}
        onCancel={closeIslandHandler}
        header={props.length}
        contentClass="game-item__modal-content"
        footerClass="game-item__modal-actions"
        footer={<Button onClick={closeIslandHandler}>CLOSE</Button>}
      >
        <div className="island-container">
          <Island />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="game-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>Are you sure you want to forfeit?</p>
      </Modal>
      <li className="game-item">
        <Card classNName="place-item__content">
          <div className="game-item__info">
            <h2>{props.length}</h2>
            <h3>{props.status}</h3>
            <p>Prize: ${props.prize}</p>
          </div>
          <div className="game-item__actions">
            <Button inverse onClick={openIslandHandler}>
              GO TO ISLAND
            </Button>
            <Button to={`games/${props.id}`}>VIEW GAME LOG</Button>
            {auth.isLoggedIn && props.status !== 'Concluded' && (
              <Button danger onClick={showDeleteWarningHandler}>
                FORFEIT GAME
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default GameItem;
