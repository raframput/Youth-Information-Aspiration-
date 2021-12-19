const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscussionSchema = new Schema({
  user_id: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  aspiration_id: [
    {
      type: Schema.Types.ObjectId,
      ref: "aspirations",
    },
  ],
  discussion_description: {
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

module.exports = mongoose.model("discussions", DiscussionSchema);
