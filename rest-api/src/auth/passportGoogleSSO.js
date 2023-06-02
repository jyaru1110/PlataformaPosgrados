const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Usuario = require('../models/Usuario');

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID_GOOGLE,
    clientSecret: process.env.CLIENT_SECRET_GOOGLE,
    callbackURL: process.env.CALLBACK_URL_GOOGLE,
    passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
    const usuario = await Usuario.findOne({ where: { googleId: profile.id } });
    if (usuario) {
        return done(null, usuario);
    }
    const nuevoUsuario = await Usuario.create({
        email: profile.emails[0].value,
        googleId: profile.id,
        nombre: profile.displayName
    });
    done(null, nuevoUsuario);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});


passport.deserializeUser(async (id, done) => {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
        done(null, usuario);
    }
}); 