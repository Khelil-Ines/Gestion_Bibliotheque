const mongoose = require('mongoose');

const Auteur = mongoose.model('auteur', {
  lastName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  nationality: {
    type: String,
    required: true
  },
});

module.exports = Auteur;