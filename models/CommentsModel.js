const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users"
      }
  ],
  news_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "News"
      }
  ],
  comment_description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('comments', CommentSchema);
