import React from 'react';

import ContestantItem from './ContestantItem';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import './ContestantList.css';

const ContestantList = props => {
  return (
    <ul className="contestant-list">
      {props.items.map(contestant => (
        <ContestantItem
          key={contestant.id}
          nickname={contestant.nickname}
          avatar={contestant.avatar}
          strategy={contestant.strategy}
        />
      ))}
    </ul>
  );
};

export default ContestantList;
