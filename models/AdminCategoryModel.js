const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminCategorySchema = new Schema({

    category_name: {
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

module.exports = mongoose.model('adminCategory', adminCategorySchema);