import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';

import './ContestantItem.css';

const ContestantItem = props => {

  return (
    <React.Fragment>
      <li className="contestant-item">
        <Card className="contestant-item__content">
          <Link>
            <div className="contestant-item__avatar">
              <Avatar image={props.avatar} alt={props.nickname}/>
            </div>
            <div className="contestant-item__info">
              <h3>{props.nickname}</h3>
              <h4>Last Active: 10 minutes ago</h4>
            </div>
          </Link>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default ContestantItem;
