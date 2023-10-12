const {Router} = require('express');
const router = Router();
const {get_procesos,create_proceso} = require('../controllers/proceso.controller');
const {isUserAuthenticated} = require('../middlewares/auth');

router.get('/procesos',isUserAuthenticated, get_procesos);
router.post('/procesos',isUserAuthenticated, create_proceso);

module.exports = router;