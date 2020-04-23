import React, { useEffect, useState } from 'react';
import shave from 'shave';

import Modal from '../../../shared/components/UIElements/Modal';
import Button from '../../../shared/components/FormElements/Button';
import './ConversationListItem.css';

export default function ConversationListItem(props) {
  useEffect(() => {
    shave('.conversation-snippet', 20);
  });

  const { nickname, avatar, text } = props.data;
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    console.log('Deleted')
  };
  return (
    <React.Fragment>
    <Modal
    show={showConfirmModal}
    onCancel={cancelDeleteHandler}
    header="Are you sure?"
    footerClass="place-item__modal-actions"
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
    <p>
      Deleted conversations cannot be recovered.
    </p>
  </Modal>
    <div className="conversation-list-item">
      <img className="conversation-photo" src={avatar} alt="conversation" />
      <div className="conversation-info">
        <h1 className="conversation-title">{nickname}</h1>
        <p className="conversation-snippet">{text}</p>
      </div>
      <div className="delete-conversation-icon">
        <i className="toolbar-button ion-ios-close-circle-outline" onClick={showDeleteWarningHandler} />
      </div>
    </div>
    </React.Fragment>
  );
}
