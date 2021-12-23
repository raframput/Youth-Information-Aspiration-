const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AspirationSchema = new Schema({
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
  aspiration_title: {
    type: String,
    required: true,
  },
  aspiration_image: {
    type: String,
    required: true,
  },
  aspiration_description: {
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

module.exports = mongoose.model('aspirations', AspirationSchema);
