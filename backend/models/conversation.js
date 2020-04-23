const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  participants: [{ type: mongoose.Types.ObjectId, ref: 'Contestant' }],
  messages: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
});

module.exports = mongoose.model('Conversation', conversationSchema);