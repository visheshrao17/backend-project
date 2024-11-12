const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  chat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
  sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message_text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);
