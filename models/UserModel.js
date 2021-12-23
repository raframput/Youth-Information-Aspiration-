const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator")
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
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
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.plugin(uniqueValidator, {message: "Email already in use."})

module.exports = mongoose.model('users', UserSchema);
