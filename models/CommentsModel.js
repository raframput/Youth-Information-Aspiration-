const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
  ],
  news_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "news"
      }
  ],
  comment_description: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('comments', CommentSchema);
