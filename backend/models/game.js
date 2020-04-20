const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  duration: { type: String, require: true },
  status: { type: String, require: true },
  prize: { type: Number, require: true },
  users: [{ type: String }],
  players: [{ type: Object, ref: 'Player' }],
});

module.exports = mongoose.model('Game', gameSchema);