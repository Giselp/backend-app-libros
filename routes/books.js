const express = require("express");
const prisma = require("../prisma");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated")

router.get("/index"/* , isAuthenticated */, async (req, res) => {
  const books = await prisma.Book.findMany();
  console.log(books)
  res.render("index", {
    title: "Bienvenido/a",
    books,
  });
});

router.get("/read/:id", isAuthenticated, async (req, res) => {
  const bookId = req.params.id
  const books = await prisma.Book.findUnique({
    where: {
      id: bookId
    },
  });
  res.render("read", {
    books,
  });
});


module.exports = router;