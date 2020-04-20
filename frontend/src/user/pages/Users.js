import React from 'react';

import UserList from '../components/UserList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Kyle Kennedy',
      image:
        'https://static01.nyt.com/images/2018/05/03/us/03spongebob_xp/03spongebob_xp-articleLarge.jpg?quality=75&auto=webp&disable=upscale',
      winCount: 1000,
    },
  ];
  return <UserList items={USERS} />;
};

export default Users;
