// config/passport.js
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const prisma = require("../prisma");
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(async (email, password, done) => {
    try {
      const user = await prisma.User.findUnique({
        where: { email },
      });
      console.log(user, "desde passport")
      if (!user) {
        return done(null, false, { message: "Usuario no encontrado" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: "Contraseña incorrecta" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.User.findUnique({ where: { id: id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
