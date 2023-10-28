const mongoose = require('mongoose');

const Category = mongoose.model('category', {
  title: {
    type: String,
    required: true
  }
  
});

module.exports = Category;