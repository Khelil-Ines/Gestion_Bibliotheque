
const express = require('express');
const mongoose = require('mongoose');
const Livre = require('./models/Livre');
const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With,Content,Accept,Content-Type,Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,PATCH,OPTIONS"
    );
    next();
  });


// Connexion à la base de données MongoDB
mongoose.connect("mongodb+srv://khelilines14:inesmangodb123@cluster0.wtbu2gx.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser : true, useUnifiedTopology: true } )
      .then(() => console.log("Connexion a MongoDB réussie !"))
      .catch((e) => console.log("Connexion a MongoDB échouée!", e ))




//  CRUD

// Créer un nouveau livre
app.post('/livres', (req, res) => {
  const { title, author, annee } = req.body;
  const nouveauLivre = new Livre({ title, author, annee });
    nouveauLivre.save()
    .then(livre => {
    res.json(livre);
  })
  .catch(err => {
    res.status(400).json({ erreur: 'Échec de la création du livre' });
});
});


// Récupérer tous les livres
app.get('/livres', (req, res) => {
    Livre.find({})
        .then(livres => {
         res.json(livres);
    })
    .catch(err => {
      res.status(500).json({ erreur: 'Erreur du serveur' });
    });
  
});

// Récupérer un livre par son ID
app.get('/livres/:id', (req, res) => {
  Livre.findById(req.params.id)
  .then(livre => {
    if (!livre) return res.status(404).json({ erreur: 'Livre non trouvé' });
    res.json(livre);
  })
  .catch(err => {
    res.status(500).json({ erreur: 'Erreur du serveur' });
  });
});

// Mettre à jour un livre par son ID
app.put('/livres/:id', (req, res) => {
  Livre.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then(livre => {
    if (!livre) return res.status(404).json({ erreur: 'Livre non trouvé' });
    res.json(livre);
  })
  .catch(err => {
    res.status(500).json({ erreur: 'Erreur du serveur' });
  });
});

// Supprimer un livre par son ID
app.delete('/livres/:id', (req, res) => {
  Livre.findByIdAndRemove(req.params.id)
  .then(livre => {
    if (!livre) return res.status(404).json({ erreur: 'Livre non trouvé' });
    res.json({ message: 'Livre supprimé avec succès' });
  })
  .catch(err => {
    res.status(500).json({ erreur: 'Erreur du serveur' });
  });
});

module.exports = app;

