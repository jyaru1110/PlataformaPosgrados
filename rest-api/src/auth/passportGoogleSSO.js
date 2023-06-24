const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Usuario = require("../models/Usuario");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID_GOOGLE,
      clientSecret: process.env.CLIENT_SECRET_GOOGLE,
      callbackURL: process.env.CALLBACK_URL_GOOGLE,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      const defaultUser = {
        email: profile.emails[0].value,
        googleId: profile.id,
        nombre: profile.displayName,
      };

      const user = await Usuario.findOrCreate({
        where: { googleId: profile.id },
        defaults: defaultUser,
      }).catch((err) => {
        console.log("Error signing up", err);
        cb(err, null);
      });

      if (user && user[0]) return done(null, user && user[0]);
    }
  )
);

passport.serializeUser((user, cb) => {
  console.log("Serializing user:", user);
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  console.log("Deserializing user:", id);
  const user = await Usuario.findOne({ where: { id: id } }).catch((err) => {
    console.log("Error deserializing", err);
    cb(err, null);
  });

  console.log("DeSerialized user", user);

  if (user) {
    cb(null, user);
    console.log("User deserialized");
  }
});
module.exports = passport;
