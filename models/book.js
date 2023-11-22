const mongoose = require('mongoose');

const Book = mongoose.model('book', {
  title: {
    type: String,
    required: true
  },
 
auteur: [{ type: mongoose.Schema.Types.ObjectId, ref: 'auteur' 
}],
categorie: [{ type: mongoose.Schema.Types.ObjectId, ref: 'category' 
}]
});
bookSchema.statics.findByAuthor = function(authorId) {
  return this.find({ author: authorId }); 
};

module.exports = Book;