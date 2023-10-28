const express = require("express");
const router = express.Router();
const Category = require("../models/category");

const catController = require("../controllers/category");


router.post("/", catController.addCategory   );

module.exports = router;