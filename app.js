const express = require('express');
const prisma = require("./prisma");
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require('morgan');
const methodOverride = require('method-override');
const { create } = require('express-handlebars');
const hbs = create({
  extname: 'hbs',
  defaultLayout: 'main',
  partialsDir: 'views/partials',
  helpers: require('./utils/helpers'),
});

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

const router = require('./routes');
app.use('/', router);

app.get("/", (req, res) => {
  res.render("home", {
    title: "Tu club de lectura",
  });
});

app.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
  });
});

app.get("/register", (req, res) => {
  res.render("register", {
    title: "Register",
  });
});

app.get("/index", async (req, res) => {
  const books = await prisma.Book.findMany({
    select: {
      url: true,
      title: true,
      author: true,
      cover: true,
    },
  });
  res.render("index", {
    title: "Bienvenido/a",
    books
  });
});

app.get("/read/:id", async (req, res) => {

  const books = await prisma.Book.findMany({
    select: {
      url: true,
      title: true,
      id: true,
    },
  });
  res.render("read", {
    title: "Bienvenido/a",
    books,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
