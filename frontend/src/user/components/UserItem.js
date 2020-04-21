import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';

import './UserItem.css';

const UserItem = props => {
  return (
    <li className="user-item">
      <Card>
        <Link to={`/games/${props.id}/`}>
          <div className="user-item__info">
            <h2>{props.email}</h2>
            <h3>
              {props.firstName} {props.lastName}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
