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


// const addBook = (req, res, next) => {
//   const { title, auteur, categorie } = req.body;
//   const newBook = new Book({ title, auteur, categorie });

//   Aut.findOne({ _id: auteur })
//     .then((authorResponse) => {
//       if (!authorResponse) {
//         res.status(401).json({ error: "Auteur introuvable!" });
//       } else {
//         cat.findOne({ _id: categorie })
//           .then((categoryResponse) => {
//             if (!categoryResponse) {
//               res.status(401).json({ error: "Categorie introuvable!" });
//             } else {
//               newBook.save()
//                 .then((newBook) => {
//                   res.json(newBook);
//                 })
//                 .catch((err) => {
//                   res.status(400).json({ erreur: "Échec de la création du livre" });
//                 });
//             }
//           })
//           .catch((categoryError) => {
//             res.status(400).json({ erreur: "Erreur lors de la recherche de la catégorie" });
//           });
//       }
//     })
//     .catch((authorError) => {
//       res.status(400).json({ erreur: "Erreur lors de la recherche de l'auteur" });
//     });
// };


const addBook = (req, res, next) => {
  const { title, auteur, categorie } = req.body;
  const newBook = new Book({ title, auteur, categorie });

  
  newBook.validate((err) => {
    if (err) {
      res.status(401).json({ error: 'ID d\'auteur invalide!' });
      return;
    }

    Aut.findOne({ _id: auteur })
      .then((authorResponse) => {
        if (!authorResponse) {
          res.status(401).json({ error: "Auteur introuvable!" });
        } else {
          Cat.findOne({ _id: categorie })
            .then((categoryResponse) => {
              if (!categoryResponse) {
                res.status(401).json({ error: "Categorie introuvable!" });
              } else {
                newBook.save()
                  .then((savedBook) => {
                    res.json(savedBook);
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
  });
};

const creerbookavecvalidationauteur = async (req, res) => {
  try {
    const { title, auteur } = req.body;

    // Valider le livre avec Mongoose
    const newBook = new Livre({ title, auteur });
    await newBook.validate();

    // Vérifier si l'auteur a des anciens livres
    const anciensLivres = await Book.find({ auteur });

    if (anciensLivres.length > 0) {
      // L'auteur a des anciens livres, vous pouvez créer le nouveau livre
      await newBook.save();
      res.status(201).json({ message: 'Livre créé avec succès!' });
    } else {
      // L'auteur n'a pas d'anciens livres
      res.status(401).json({ error: 'L\'auteur doit avoir écrit d\'autres livres avant de créer celui-ci.' });
    }
  } catch (error) {
    res.status(400).json({ erreur: error.message });
  }
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
    findbookbyauthor,
    creerbookavecvalidationauteur
}
