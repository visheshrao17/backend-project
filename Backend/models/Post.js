const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  media_url: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);
