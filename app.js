const express = require("express");
const prisma = require("./prisma");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const passport = require("passport");
const pgSession = require("connect-pg-simple")(session);
const { Pool } = require("pg");
const morgan = require("morgan");
const methodOverride = require("method-override");
const { create } = require("express-handlebars");
const hbs = create({
  extname: "hbs",
  defaultLayout: "main",
  partialsDir: "views/partials",
  helpers: require("./utils/helpers"),
});

const PORT = process.env.PORT || 3000;

require("dotenv").config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const app = express();
app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "Session",
    }),
    secret: process.env.SESSION_SECRET || "SECRET",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(flash());
app.use(cookieParser());
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");

const router = require("./routes");
app.use("/", router);

app.get("/home", (req, res) => {
  res.render("home", {
    title: "Tu club de lectura",
  });
});

app.get("/aboutus", (req, res) => {
  res.render("aboutus");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

/* app.get("/error", (req, res) => {
  const mensaje = "Mensaje creado exitosamente";
  const registro = "Usuario registrado correctamente";
  const errorMes = "Algunos de los datos ingresados no es correcto. Vuelva a intentarlo";
  res.render("error", { mensaje, registro, errorMes})
}) */

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
