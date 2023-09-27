const express = require('express');
const passport = require('passport');
const router = express.Router();

const callbackURL_front = process.env.CALLBACK_URL_FRONT;

router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email','https://www.googleapis.com/auth/drive','https://www.googleapis.com/auth/drive.file','https://www.googleapis.com/auth/drive.resource'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
    failureMessage: 'No se pudo iniciar sesión con Google',
    successRedirect: callbackURL_front,
}), (req, res) => {
    console.log('req.user: ', req.user);
    res.send('Login con Google exitoso');
}
);



module.exports = router;