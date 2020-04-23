import React from 'react';

import ContestantItem from './ContestantItem';
import './ContestantList.css';

const ContestantList = props => {
  return (
    <ul className="contestants-list">
      {props.items.map(contestant => (
        <ContestantItem
          key={contestant._id}
          nickname={contestant.nickname}
          avatar={contestant.avatar}
          strategy={contestant.strategy}
          user={contestant.user}
        />
      ))}
    </ul>
  );
};

export default ContestantList;
