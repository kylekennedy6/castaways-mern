import React from 'react';

import ContestantList from './../../../game/components/ContestantList';
import './Island.css';

const Island = props => {
  return (
    <div className={`island ${props.className}`} style={props.style}>
      <ContestantList items={props} />
    </div>
  );
};

export default Island;
