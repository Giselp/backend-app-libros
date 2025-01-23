const express = require("express");
const prisma = require("../prisma");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/", isAuthenticated, async (req, res) => {
  const books = await prisma.Book.findMany();
  console.log(books);
  res.render("index", { books });
});

router.get("/read/:id", isAuthenticated, async (req, res) => {
  const bookId = req.params.id;
  const books = await prisma.Book.findUnique({
    where: {
      id: bookId,
    },
  });
  res.render("read", {
    books,
  });
});

router.post("/review/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    console.log(bookId);
    const { message } = req.body;
    if (!message || message.trim() == "") {
      return res.status(400).send("El mensaje no puede estar vacío.");
    }
    console.log(message);
    const book = await prisma.Book.findUnique({
      where: {
        id: bookId,
      },
    });

    const newReview = await prisma.Comments.create({
      data: {
        review: message,
        bookId: bookId,
      },
    });
    console.log(newReview);
    res.send("Mensaje creado exitosamente.");
  } catch (error) {
    res.send("Ocurrió un error al crear el comentario.");
  }
});

router.get("/more/:id", isAuthenticated, async (req, res) => {
  const bookId = req.params.id;
  const books = await prisma.Book.findUnique({
    where: {
      id: bookId,
    },
  });
    res.render("review", {
    books,
  });
});



module.exports = router;
