const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Game = require('../models/game');

const MAX_PLAYERS = 4;
const MATCHMAKING_STATUS = 'Matchmaking';
const DUMMY_GAMES = [
  {
    id: 'g5',
    duration: '30',
    status: 'Matchmaking',
    prize: 10,
    users: ['u1', 'u2', 'u3'],
    players: [
      {
        uid: 'u1',
        nickname: 'Daryl',
        strategy: 'Hybrid',
      },
      {
        uid: 'u2',
        nickname: 'Jordan',
        strategy: 'Social',
      },
      {
        uid: 'u3',
        nickname: 'Kylie',
        strategy: 'Productive',
      },
    ],
  },
  {
    id: 'g4',
    duration: 30,
    status: 'Matchmaking',
    prize: 10,
    users: ['u1', 'u2', 'u3', 'u4'],
    players: [
      {
        uid: 'u1',
        nickname: 'Daryl',
        strategy: 'Hybrid',
      },
      {
        uid: 'u2',
        nickname: 'Jordan',
        strategy: 'Social',
      },
      {
        uid: 'u3',
        nickname: 'Kylie',
        strategy: 'Productive',
      },
      {
        uid: 'u4',
        nickname: 'Sabrina',
        strategy: 'Social',
      },
    ],
  },
  {
    id: 'g3',
    duration: 30,
    status: 'In Progress',
    prize: 10,
    users: ['u1', 'u2', 'u3', 'u4'],
    players: [
      {
        uid: 'u1',
        nickname: 'Daryl',
        strategy: 'Hybrid',
      },
      {
        uid: 'u2',
        nickname: 'Jordan',
        strategy: 'Social',
      },
      {
        uid: 'u3',
        nickname: 'Kylie',
        strategy: 'Productive',
      },
      {
        uid: 'u4',
        nickname: 'Sabrina',
        strategy: 'Social',
      },
    ],
  },
  {
    id: 'g2',
    duration: 30,
    status: 'Concluded',
    prize: 10,
    users: ['u1', 'u2', 'u3', 'u4'],
    players: [
      {
        uid: 'u1',
        nickname: 'Daryl',
        strategy: 'Hybrid',
      },
      {
        uid: 'u2',
        nickname: 'Jordan',
        strategy: 'Social',
      },
      {
        uid: 'u3',
        nickname: 'Kylie',
        strategy: 'Productive',
      },
      {
        uid: 'u4',
        nickname: 'Sabrina',
        strategy: 'Social',
      },
    ],
  },
  {
    id: 'g1',
    duration: 30,
    status: 'Concluded',
    prize: 10,
    users: ['u1', 'u2', 'u3', 'u4'],
    players: [
      {
        uid: 'u1',
        nickname: 'Daryl',
        strategy: 'Hybrid',
      },
      {
        uid: 'u2',
        nickname: 'Jordan',
        strategy: 'Social',
      },
      {
        uid: 'u3',
        nickname: 'Kylie',
        strategy: 'Productive',
      },
      {
        uid: 'u4',
        nickname: 'Sabrina',
        strategy: 'Social',
      },
    ],
  },
];

const getGameById = async (req, res, next) => {
  const gameId = req.params.gid;

  let game;
  try {
    game = await Game.findById(gameId);
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
    games = await Game.find({ users: { $in: [userId] } });
  } catch (err) {
    return next(
      new HttpError(
        'Something went wrong, could not find any games associated with this user.',
        500
      )
    );
  }
  if (!games || games.length === 0) {
    return next(
      new HttpError('Could not find games for the provided user id.', 404)
    );
  }

  res.json({ games: games.map(game => game.toObject({ getters: true })) });
};

const joinOrCreateGame = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  // SEARCH FOR GAMES IN MATCHMAKING THAT  FITS USER PREFERENCES
  const { nickname, duration, strategy } = req.body;
  const userId = req.params.uid;
  let gameMatch = {
    ...DUMMY_GAMES.find(
      g =>
        g.duration === duration &&
        g.users.length < MAX_PLAYERS &&
        g.status === MATCHMAKING_STATUS &&
        !g.users.includes(userId)
    ),
  };

  // IF NO GAMES ARE A FIT, CREATE A NEW GAME. OTHERWISE, JOIN EXISTING GAME
  if (!gameMatch.duration) {
    console.log('No games are in matchmaking... Creating new game.');
    gameMatch = new Game({
      duration,
      status: MATCHMAKING_STATUS,
      prize: 10,
      users: [userId],
      players: [
        {
          uid: userId,
          nickname: nickname,
          strategy: strategy,
        },
      ],
    });
    console.log('HERE');
    try {
      await gameMatch.save();
    } catch (err) {
      return next(new HttpError('Joining game failed, please try again.', 500));
    }
  } else {
    const gameIndex = DUMMY_GAMES.findIndex(g => g.id === gameMatch.id);
    const player = {
      uid: userId,
      nickname,
      strategy,
    };

    gameMatch.users.push(userId);
    gameMatch.players.push(player);

    DUMMY_GAMES[gameIndex] = gameMatch;
  }
  res.status(200).json({ game: gameMatch });
};

exports.getGameById = getGameById;
exports.getGamesByUserId = getGamesByUserId;
exports.joinOrCreateGame = joinOrCreateGame;
