const {Router} = require('express');
const router = Router();
const {get_programas_escuela,get_programas_todos,update_programa} = require('../controllers/programas.controllers');
const { isUserAuthenticated } = require('../middlewares/auth');

router.get('/programas/:escuela',get_programas_escuela);
router.get('/programas',get_programas_todos);

router.patch('/programas/:programa',isUserAuthenticated,update_programa);


module.exports = router;