const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Conversation = require('../models/conversation');
const Contestant = require('../models/contestant');

const getConversationsByContestantId = async (req, res, next) => {
  let conversations;
  try {
    conversations = await Conversation.find().populate('participants');
  } catch (err) {
    return next(
      new HttpError('Fetching conversations failed, please try again.', 500)
    );
  }
  res.json({ conversations: conversations.map(conversation => conversation.toObject({ getters: true })) });
};

const createConversation = async (req, res, next) => {
  console.log(req.body)
  const { message, recipients, contestantId } = req.body
  console.log(message)
  console.log(recipients)
  console.log(contestantId)
  let creatorContestant;
  try {
    creatorContestant = await Contestant.findById(contestantId);
  } catch (err) {
    return next(new HttpError('Create new message failed, please try again.', 500))
  }

  if (!creatorContestant) {
    return next(new HttpError('Could not find your game info.', 404))
  }

  const createdConversation = new Conversation({
    participants: [creatorContestant],
    messages: []
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdConversation.save({ session: sess });
    creatorContestant.privateConversations.push(createdConversation);
    await creatorContestant.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(new HttpError('Create new conversation failed, please try again.', 500))
  }
  
  res.status(201).json({ conversation: createdConversation });
};

const deleteConversation = (req, res, next) => {

}

exports.getConversationsByContestantId = getConversationsByContestantId;
exports.createConversation = createConversation;
exports.deleteConversation = deleteConversation;