const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiscussionSchema = new Schema({
  user_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
  ],
  aspiration_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "aspirations"
      }
  ],
  discussion_description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('discussions', DiscussionSchema);
