const express = require("express");
const router = express.Router();
const Book = require("../models/book");

const bookController = require("../controllers/book");


router.get("/",bookController.fetchBooks ) 

router.post("/", bookController.addBook   );

router.patch("/:id",bookController.UpdateBook );

router.delete("/:id", bookController.DeleteBook);

router.get('/books/author/:id',bookController.findbookbyauthor);

  module.exports = router;