module.exports.isUserAuthenticated = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.status(401).send('No autorizado');
}