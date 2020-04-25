const express = require('express');
const { check } = require('express-validator');

const gamesControllers = require('../controllers/games-controllers');
const checkAuth = require('../middleware/check-auth');

const DURATION_OPTIONS = ['1 Day', '3 Days', '7 Days'];
const STRATEGY_OPTIONS = ['Social', 'Productive', 'Hybrid'];
const router = express.Router();

router.get('/:gid', gamesControllers.getGameById);

router.get('/user/:uid', gamesControllers.getGamesByUserId);

router.use(checkAuth);

router.post(
  '/find-game/',
  [
    check('nickname').not().isEmpty(),
    check('duration').isIn(DURATION_OPTIONS),
    check('strategy').isIn(STRATEGY_OPTIONS)
  ],
  gamesControllers.joinOrCreateGame
);

module.exports = router;
