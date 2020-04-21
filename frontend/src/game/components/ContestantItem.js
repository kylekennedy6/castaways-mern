import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import './ContestantItem.css';

const ContestantItem = props => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to="/">
          <div className="user-item__image">
            <Avatar image={props.avatar} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h4>{props.nickname}</h4>
            <h5>
              Player Type: {props.strategy}
            </h5>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default ContestantItem;
