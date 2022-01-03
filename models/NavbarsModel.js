const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NavbarSchema = new Schema({
  menu_name: {
    type: String,
    required: true,
  },
  menu_url: {
    type: String,
    required: true,
  },
  menu_parent_id: {
    type: String,
    required: false,
  },
  menu_level: {
    type: String,
    required: true,
  },
  menu_status: {
    type: String,
    required: true,
  },
  menu_position: {
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

module.exports = mongoose.model('navbar', NavbarSchema);
