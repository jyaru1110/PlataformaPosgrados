const express = require('express');
const passport = require('passport');
const router = express.Router();

const callbackURL_front = process.env.CALLBACK_URL_FRONT;

router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
    failureMessage: 'No se pudo iniciar sesión con Google',
    successRedirect: callbackURL_front,
    failureRedirect:  callbackURL_front,
}), (req, res) => {
    res.send('Login con Google exitoso');
}
);

module.exports = router;