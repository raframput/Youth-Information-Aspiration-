const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserGroupSchema = new Schema({
  name_group: {
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

module.exports = mongoose.model('user_groups', UserGroupSchema);
