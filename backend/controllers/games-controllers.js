const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Game = require('../models/game');
const User = require('../models/user');
const Contestant = require('../models/contestant');

const MAX_PLAYERS = 4;
const MATCHMAKING_STATUS = 'Matchmaking';
const IN_PROGRESS_STATUS = 'In Progress';
const AVATAR_OPTIONS = [
  'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png',
  'https://vignette.wikia.nocookie.net/characters/images/6/6b/309.png/revision/latest/scale-to-width-down/340?cb=20141230071329',
  'https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Squidward_Tentacles.svg/1200px-Squidward_Tentacles.svg.png',
  'https://vignette.wikia.nocookie.net/spongebob/images/7/7b/Krabs_artwork.png/revision/latest?cb=20181201224233',
];

const getGameById = async (req, res, next) => {
  const gameId = req.params.gid;

  let game;
  try {
    game = await Game.findById(gameId).populate('contestants');
  } catch (err) {
    return next(
      new HttpError(
        'Something went wrong, could not find the game you were looking for.',
        500
      )
    );
  }

  if (!game) {
    return next(
      new HttpError('Could not find a game for the provided id.', 404)
    );
  }

  res.json({ game: game.toObject({ getters: true }) });
};

const getGamesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let games;
  try {
    let user = await User.findById(userId);
    console.log(user._id)
    games = await Game.find({ users: { $in: [userId] } }).populate(
      'contestants'
    );
  } catch (err) {
    return next(
      new HttpError(
        'Something went wrong, could not find any games associated with this user.',
        500
      )
    );
  }
  if (!games) {
    return next(
      new HttpError('Could not find games for the provided user id.', 404)
    );
  }

  res.json({ games: games.map(game => game.toObject({ getters: true })) });
};

const joinOrCreateGame = async (req, res, next) => {
  //  CHECK FOR INPUT ERRORS
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  // GET USER, RETURN ERROR IF FAILS
  const { nickname, duration, strategy, userId } = req.body;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(new HttpError('Joining game failed, please try again', 500));
  }

  if (!user) {
    return next(new HttpError('Could not find user for provided id.', 404));
  }
  // FIND EXISTING GAME SUCH THAT:
  // GAME IS STILL IN MATCHMAKING
  // GAME DURATION MATCHES USER'S DURATION PREFERENCE
  // USER IS NOT ALREADY IN GAME

  let gameMatch;
  try {
    gameMatch = await Game.findOne({
      duration: duration,
      status: MATCHMAKING_STATUS,
      users: { $nin: [user._id] },
    });
  } catch (err) {
    return next(new HttpError('Finding game failed, please try again.', 500));
  }

  // IF NO GAMES ARE A FIT:
  // CREATE A CONTESTANT WITH THE FIRST AVATAR OPTION
  // CREATE A NEW GAME
  let newContestant;
  if (!gameMatch) {
    console.log('No games are in matchmaking... Creating new game.');
    try {
      newContestant = new Contestant({
        nickname,
        avatar: AVATAR_OPTIONS[0],
        strategy,
        user: user._id,
      });
      gameMatch = new Game({
        duration,
        status: MATCHMAKING_STATUS,
        prize: 10,
        users: [],
        contestants: [],
        remainingAvatarOptions: AVATAR_OPTIONS,
      });
    } catch (err) {
      return next(
        new HttpError('Failed to create or join game. Please try again.', 500)
      );
    }

    // IF GAME MATCH IS FOUND:
    // CREATE A CONTESTANT WITH THE FIRST REMAINING AVATAR OPTION
    // ADD CONTESTANT TO EXISTING GAME
    // ADD USER TO EXISTING GAME
    // REMOVE AVATAR FROM REMAINING OPTIONS
  } else {
    try {
      newContestant = new Contestant({
        nickname,
        avatar: gameMatch.remainingAvatarOptions[0],
        strategy,
        user: user,
      });
    } catch (err) {
      return next(
        new HttpError('Joining existing game failed. Please try again.', 500)
      );
    }
  }

  // AFTER GAME IS FOUND OR CREATED AND CONTESTANT IS CREATED, SAVE CHANGES TO DATABASE
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newContestant.save({ session: sess });
    gameMatch.users.push(user._id);
    gameMatch.contestants.push(newContestant._id);
    gameMatch.remainingAvatarOptions = gameMatch.remainingAvatarOptions.slice(
      1
    );
    if (gameMatch.contestants.length === MAX_PLAYERS) {
      gameMatch.status = IN_PROGRESS_STATUS;
      console.log('Game Filled');
    } else {
      console.log(gameMatch.contestants.length);
      console.log('Game Not Filled');
    }
    await gameMatch.save({ session: sess });
    user.games.push(gameMatch);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(new HttpError('Joining game failed, please try again.', 500));
  }
  res.status(200).json({ game: gameMatch });
};

exports.getGameById = getGameById;
exports.getGamesByUserId = getGamesByUserId;
exports.joinOrCreateGame = joinOrCreateGame;
