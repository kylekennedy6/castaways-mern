const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Contestant = require('../models/contestant');

const getContestantsByGameId = async (req,res, next) => {
  const gameId = req.params.gameId;
  let contestants;
  try {
    contestants = await Contestant.find({game: gameId});  } catch (err) {
    return next(new HttpError('Error fetching contestants. Please try again.', 500))
  }
  res.json({ contestants: contestants.map(contestant => contestant.toObject({ getters: true })) });
};

exports.getContestantsByGameId = getContestantsByGameId;