const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  duration: { type: String, required: true },
  status: { type: String, required: true },
  prize: { type: Number, required: true },
  users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  contestants: [{ type: mongoose.Types.ObjectId, ref: 'Contestant' }],
  remainingAvatarOptions: [{ type: String, required: true }]
});

module.exports = mongoose.model('Game', gameSchema);