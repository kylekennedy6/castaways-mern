import React, { useContext } from 'react';

import Messenger from '../../messenger/components/Messenger/Messenger';
import { AuthContext } from '../../shared/context/auth-context';
import './Island.css';

const Island = props => {
  const auth = useContext(AuthContext);
  const opponents = props.contestants.filter(c => c.user !== auth.userId);
  return (
    <Messenger opponents={opponents}/>
  );
};

export default Island;
