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
      const user = await Usuario.findOne({
        where: { email: profile.emails[0].value },
      }).catch((err) => {
        console.log("Error signing up", err);
        done(err, null);
      });
      if (user.dataValues.googleId == null || user.dataValues.accessToken == null || user.dataValues.refreshToken == null) {
        const user = await Usuario.update(
          {
            googleId: profile.id,
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
          {
            where: { email: profile.emails[0].value },
          }
        ).catch((err) => {
          console.log("Error signing up", err);
          done(err, null);
        });
      }

      if (user) return done(null, user);
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await Usuario.findOne({ where: { id: id } }).catch((err) => {
    cb(err, null);
  });
  if (user) {
    cb(null, user);
  }
});
module.exports = passport;
