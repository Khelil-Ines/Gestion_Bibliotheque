const express = require("express");
const router = express.Router();
const Auteur = require("../models/auteur");
const auteurController = require("../controllers/auteur");


router.get("/",auteurController.fetchAuthors); 

router.post("/",auteurController.addAuthor);

router.patch("/:id", auteurController.updateAuteur);

router.delete("/:id", auteurController.deleteAuteur);


  module.exports = router;