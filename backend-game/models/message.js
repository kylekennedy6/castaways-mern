const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: { type: mongoose.Types.ObjectId, ref: 'Contestant' },
  text: { type: String, required: true },
  timeStamp: { type: Date, required: true }
});

module.exports = mongoose.model('Message', messageSchema);