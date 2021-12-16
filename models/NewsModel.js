const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  user_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
  ],
  category_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "categories"
      }
  ],
  news_title: {
    type: String,
    required: true,
  },
  news_author: {
    type: String,
    required: true,
  },
  news_thumbnail: {
    type: String,
    required: true,
  },
  news_image: {
    type: String,
    required: true,
  },
  news_description: {
    type: String,
    required: true,
  },
  news_source: {
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

module.exports = mongoose.model('news', NewsSchema);
