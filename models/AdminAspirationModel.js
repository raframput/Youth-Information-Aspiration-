const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminAspirationSchema = new Schema({

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

// timestamp

  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  
}, {
 
 
});

module.exports = mongoose.model('adminAspiration', adminAspirationSchema);