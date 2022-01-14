const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  user_id: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  category_id: [
    {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
  ],
  news_title: {
    type: String,
    required: false,
  },
  news_author: {
    type: String,
    required: false,
  },
  news_thumbnail: {
    type: String,
    required: false,
  },
  news_description: {
    type: String,
    required: false,
  },
  news_video: {
    type: String,
    required: false,
  },
  news_source: {
    type: String,
    required: false,
  },
  news_hit: {
    type: Number,
    required: false,
  },
  news_popular: {
    type: Number,
    required: false,
  },
  news_trending: {
    type: Number,
    required: false,
  },
  news_status: {
    type: Number,
    default: 0,
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

module.exports = mongoose.model("news", NewsSchema);