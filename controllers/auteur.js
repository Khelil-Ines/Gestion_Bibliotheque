const Auteur = require('../models/auteur');


const addAuthor = (req, res) => {
  const author = new Auteur(req.body);
  author
    .save()
    .then(() => {
      res.status(201).json({
        models: author,
        message: "auteur crée!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "Données invalides",
      });
    });
};

const fetchAuthors = (req, res) => {
  Auteur.find()
    .then((auteurs) => {
      res.status(200).json({
        model: auteurs,
        message: "success",
      });
    })
    .catch((error) => ({
      error:error.message,
      message: "probléme d'extraction" ,
 }));
};

const getAuteurById = (req, res) => {
  Auteur.findOne({ _id: req.params.id })
    .then((auteur) => {
      if (!auteur) {
        res.status(404).json({
          message: "Auteur non trouvé!",
        });
      } else {
        res.status(200).json({
          model: auteur,
          message: "objet trouvé!",
        });
      }
    })
    .catch(() => {
      res.status(400).json({
        error: Error.message,
        message: "Données invalides!",
      });
    });
};

const updateAuteur = (req, res) => {
  Auteur.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    { new: true }
  )
    .then((auteur) => {
      if (!auteur) {
        res.status(404).json({
          message: "Objet non trouvé",
        });
      } else {
        res.status(200).json({
          model: auteur,
          message: "Objet modifié",
        });
      }
    })
    .catch((error) => res.status(400).json({ error: error.message }));
};

const deleteAuteur = (req, res) => {
  Auteur.deleteOne({ _id: req.params.id })
    .then((auteur) => {
      if (!auteur) {
        res.status(404).json({
          message: "objet non trouvé!",
        });
      } else {
        res.status(200).json({
          model: auteur,
          message: "objet trouvé!",
        });
      }
    })
    .catch(() => {
      res.status(400).json({
        error: Error.message,
        message: "Données invalides!",
      });
    });
};


module.exports = { addAuthor, fetchAuthors, getAuteurById, updateAuteur, deleteAuteur };
