const express = require("express");
const prisma = require("../prisma");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated")

router.get("/", isAuthenticated, async (req, res) => {
  const books = await prisma.Book.findMany();
  console.log(books);
  res.render("index", { books });
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

router.get("/review/:id", isAuthenticated, async (req, res) => {
  const bookId = req.params.id;
  const books = await prisma.Book.findUnique({
    where: {
      id: bookId,
    },
  });
  console.log(books.sinopsis)
  res.render("review", {
    books,
  });
});



module.exports = router;