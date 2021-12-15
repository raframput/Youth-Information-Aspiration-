const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  user_group: [
      {
        type: Schema.Types.ObjectId,
        ref: "user_groups"
      }
    ]
});

module.exports = mongoose.model('users', UserSchema);
