const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const gamesRoutes = require('./routes/games-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error.js');

const app = express();

app.use(bodyParser.json());

app.use('/api/games', gamesRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  throw new HttpError('Could not find this route.', 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || 'An unknown error occurred!' });
});

mongoose.connect('mongodb+srv://kylek321:u7uA8gHTTk1RZRb7@cluster0-9rura.mongodb.net/castaways?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
  app.listen(5000);
}).catch(err => {
  console.log(err);
});

