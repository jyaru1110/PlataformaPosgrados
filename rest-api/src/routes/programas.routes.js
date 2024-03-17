const {Router} = require('express');
const router = Router();
const {get_programas_escuela,get_programas_opciones,update_programa,get_programas_todos} = require('../controllers/programas.controllers');
const { isUserAuthenticated } = require('../middlewares/auth');

router.get('/programas/:escuela',get_programas_escuela);
router.get('/programas_opciones',get_programas_opciones);
router.get('/programas/',get_programas_todos,isUserAuthenticated);

router.patch('/programas/:programa',isUserAuthenticated,update_programa);


module.exports = router;