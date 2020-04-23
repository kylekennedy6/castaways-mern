const express = require('express');
const { check } = require('express-validator');

const conversationsControllers = require('../controllers/conversations-controllers');

const router = express.Router();

router.get('/', conversationsControllers.getConversations);

router.post('/create', conversationsControllers.createConversation);

router.delete('/login', conversationsControllers.deleteConversation);

module.exports = router;
