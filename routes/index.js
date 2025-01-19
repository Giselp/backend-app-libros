const express = require('express');
const router = express.Router();
const booksRoutes = require("./books");
const authRoutes = require("./auth")
const isAdmin = require("../middlewares/isAdmin")

router.use("/books", booksRoutes);
router.use("/auth", authRoutes);
router.use("/admin", isAdmin, require("./admin"));

module.exports = router;
