const express = require('express');
const { check } = require('express-validator');

const contestantsControllers = require('../controllers/contestants-controllers');

const router = express.Router();

router.get('/:gameId', contestantsControllers.getContestantsByGameId);

module.exports = router;
