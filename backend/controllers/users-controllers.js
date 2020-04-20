const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const DUMMY_USERS = [
  {
    id: 'u1',
    firstName: 'Kyle',
    lastName: 'Kennedy',
    email: 'kylek321@gmail.com',
    password: 'castaways',
  },
  {
    id: 'u2',
    firstName: 'Morgan',
    lastName: 'Kennedy',
    email: 'morgank321@gmail.com',
    password: 'castaways',
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const { firstName, lastName, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(
      new HttpError('Signing up failed, please try again later.', 500)
    );
  }

  if (existingUser) {
    return next(
      new HttpError('User already exists, please login instead.', 422)
    );
  }

  const createdUser = new User({
    firstName,
    lastName,
    email,
    password,
    games: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError('Signup failed, please try again.', 500));
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find(u => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      'Could not identify user. Please check your credentials.',
      401
    );
  }

  res.json({ message: 'Logged in!' });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
