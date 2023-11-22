const mongoose = require('mongoose');
const mongooseIdValidator = require('mongoose-id-validator');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  auteur: [{ type: mongoose.Schema.Types.ObjectId, ref: 'auteur' }],
  categorie: [{ type: mongoose.Schema.Types.ObjectId, ref: 'category' }]
});

bookSchema.plugin(mongooseIdValidator);

bookSchema.statics.findByAuthor = function (authorId) {
  return this.find({ auteur: authorId });
};

bookSchema.path('title').validate((value) => {
  return value.length > 0;
}, 'Le titre ne peut pas être vide.');

bookSchema.path('auteur').validate({
  validator: async function (value) {
    const auteur = await mongoose.model('auteur').findById(value);
    return auteur !== null;
  },
  message: "L'ID de l'auteur doit être valide."
});

const Book = mongoose.model('book', bookSchema);

module.exports = Book;
