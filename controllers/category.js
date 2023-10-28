const Category = require('../models/category');


const addCategory = (req, res) => {
  const cat = new Category(req.body);
  cat
    .save()
    .then(() => {
      res.status(201).json({
        models: cat,
        message: "category crée!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "Données invalides",
      });
    });
};

module.exports = {
  addCategory,
}