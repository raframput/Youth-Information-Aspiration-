const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserGroupSchema = new Schema({
  name_group: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('user_groups', UserGroupSchema);
