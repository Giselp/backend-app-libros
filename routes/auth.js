const express = require("express");
const prisma = require("../prisma");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();

router.get("/login", (req, res) => {
    res.render("login", {
    title: "Login",
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/books",
    failureRedirect: "/auth/register-page",
    failureFlash: true,
  })
);

router.get("/register-page", (req, res) => {
  res.render("register");
});

router.post("/register-page", async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.User.create({
      data: {
        nombre: nombre,
        email: email,
        password: hashedPassword,
      },
    });
    console.log(newUser)
    res.redirect("/auth/login");
  } catch (error) {
    console.log(error);
    res.send("Error al registrar usuario.");
  }
});


module.exports = router;