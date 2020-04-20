const express = require('express');
const { check } = require('express-validator');

const gamesControllers = require('../controllers/games-controllers');

const router = express.Router();

router.get('/:gid', gamesControllers.getGameById);

router.get('/user/:uid', gamesControllers.getGamesByUserId);

router.post(
  '/find-game/:uid',
  [
    check('nickname').not().isEmpty(),
    check('duration').isIn(['1', '30', '7']),
    check('strategy').isIn(['Social', 'Productive', 'Hybrid'])
  ],
  gamesControllers.joinOrCreateGame
);

module.exports = router;
