const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const whitelist = ['http://localhost:3000'];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    if(whitelist.includes(origin))
      return callback(null, true)

      callback(new Error('Not allowed by CORS'));
  }
}

app.use(cors(corsOptions));
app.use(router);

io.on('connection', socket => {
  socket.on('join', ({ nickname, room, contestantId }, callback) => {
    const { error, user } = addUser({ id: socket.id, nickname, room, contestantId });
    if (error) return callback(error);

    socket.join(user.room);

    socket.emit('message', {
      user: 'admin',
      text: `${user.nickname}, welcome to the tribe chat.`,
    });
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.nickname} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.nickname, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.nickname} has left.`,
      });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  });
});

mongoose
  .connect(
    'mongodb+srv://kylek321:teJJ2z2OacwXJvxJ@cluster0-9rura.mongodb.net/castaways?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    server.listen(process.env.PORT || 8080);
    console.log('Server has started.')
  })
  .catch(err => {
    console.log(err);
  });