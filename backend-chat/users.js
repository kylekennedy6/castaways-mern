const mongoose = require('mongoose');

const HttpError = require('../backend-game/models/http-error');
const Contestant = require('../backend-game/models/contestant');
const users = [];

const addUser = ({ id, nickname, room }) => {
  nickname = nickname.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    user => user.room === room && user.nickname === nickname
  );

  if (!nickname || !room) return { error: 'Username and room are required.' };

  const user = { id, nickname, room };

  if (!existingUser) {
    users.push(user);
  }

  return { user };
};

const removeUser = id => {
  console.log('someone left')
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = id => users.find(user => user.id === id);

const getUsersInRoom = room => users.filter(user => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
