const express = require("express");
const prisma = require("../prisma");
const router = express.Router();


/* router.get("/index", async (req, res) => {
  try {
    const books = await prisma.Book.findMany({
      select: {
        contentUrl: true,
        title: true,
        author: true
      }
    });
    return res.json(books);
  } catch (error) {
    console.log(error);
  }
}); */

module.exports = router;