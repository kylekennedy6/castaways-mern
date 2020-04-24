const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contestantSchema = new Schema({
  nickname: { type: String, required: true },
  avatar: { type: String, required: true },
  strategy: { type: String, required: true },
  privateConversations: [{ type: mongoose.Types.ObjectId, ref: 'Conversation' }],
  game: { type: mongoose.Types.ObjectId, ref: 'Game'},
  user: { type: mongoose.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Contestant', contestantSchema);