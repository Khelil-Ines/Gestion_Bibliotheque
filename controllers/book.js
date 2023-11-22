const Book = require("../models/book");
const cat = require("../models/category")
const Aut = require("../models/auteur");
// Créer un nouveau book
// const addBook = (req, res, next) => {
//   const { title, auteur, categorie } = req.body;
//   const newBook = new Book({ title, auteur, categorie });
//     Aut.findOne({ _id: auteur }).then((response) => {
//             if (!response){
//               return res.status(401).json({ error: "Auteur introuvable!"})
                
//   }else {
//     cat.findOne({ _id: categorie }).then((response) => {
//       if (!response){
//         return res.status(401).json({ error: "Categorie introuvable!"})
//         }else {
//             newBook
//             .save()
//             .then((newBook) => {
//               res.json(newBook);
//             })
//             // .catch((err) => {
//             //   res.status(400).json({ erreur: "Échec de la création du livre" });
//             // });

// }})
// }})

// }


const addBook = (req, res, next) => {
  const { title, auteur, categorie } = req.body;
  const newBook = new Book({ title, auteur, categorie });

  Aut.findOne({ _id: auteur })
    .then((authorResponse) => {
      if (!authorResponse) {
        res.status(401).json({ error: "Auteur introuvable!" });
      } else {
        cat.findOne({ _id: categorie })
          .then((categoryResponse) => {
            if (!categoryResponse) {
              res.status(401).json({ error: "Categorie introuvable!" });
            } else {
              newBook.save()
                .then((newBook) => {
                  res.json(newBook);
                })
                .catch((err) => {
                  res.status(400).json({ erreur: "Échec de la création du livre" });
                });
            }
          })
          .catch((categoryError) => {
            res.status(400).json({ erreur: "Erreur lors de la recherche de la catégorie" });
          });
      }
    })
    .catch((authorError) => {
      res.status(400).json({ erreur: "Erreur lors de la recherche de l'auteur" });
    });
};


// Récupérer tous les books
const fetchBooks = (req, res) => {
  Book.find({})
  .populate("categorie")
  .populate("auteur")
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      res.status(500).json({ erreur: "Erreur du serveur" });
    });
};

// Récupérer un book par son ID
const fetchBookById = (req, res) => {
  Book.findById(req.params.id)
  .populate("categorie")
  .populate("auteur")
    .then((book) => {
      if (!book) return res.status(404).json({ erreur: "Livre non trouvé" });
      res.json(book);
    })
    .catch((err) => {
      res.status(500).json({ erreur: "Erreur du serveur" });
    });
};

// Mettre à jour un book par son ID
const UpdateBook = (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .populate("categorie")
  .populate("auteur")
    .then((book) => {
      if (!book) return res.status(404).json({ erreur: "Livre non trouvé" });
      res.json(book);
    })
    .catch((err) => {
      res.status(500).json({ erreur: "Erreur du serveur" });
    });
};

// Supprimer un book par son ID
const DeleteBook = (req, res) => {
  Book.findByIdAndRemove(req.params.id)
    .then((book) => {
      if (!book) return res.status(404).json({ erreur: "Livre non trouvé" });
      res.json({ message: "Livre supprimé avec succès" });
    })
    .catch((err) => {
      res.status(500).json({ erreur: "Erreur du serveur" });
    });
}

const findbookbyauthor= (req, res) => {
  Book.findByAuthor(req.params.id)
    .then(books => res.json(books)) 
    .catch(err => res.status(500).json({error: err}));
}

module.exports = {
    addBook,
    fetchBooks,
    fetchBookById,
    UpdateBook,
    DeleteBook,
    findbookbyauthor
}
