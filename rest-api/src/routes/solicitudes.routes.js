const {Router} = require('express');
const router = Router();
const {get_solicitudes} = require('../controllers/solicitudes.controllers');
const { isUserAuthenticated } = require('../middlewares/auth');

router.get('/solicitudes',isUserAuthenticated,get_solicitudes);

module.exports = router;
