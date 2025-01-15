const express = require('express');
const router = express.Router();
const booksRoutes = require("./books");
const isAdmin = require("../middlewares/isAdmin")

router.use("/books", booksRoutes);
router.use("/admin", isAdmin, require("./admin"));

module.exports = router;
