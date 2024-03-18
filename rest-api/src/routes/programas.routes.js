const {Router} = require('express');
const router = Router();
const {get_programas_escuela,get_programas_opciones,update_programa_proceso,get_programas_todos,get_programa,update_programa} = require('../controllers/programas.controllers');
const { isUserAuthenticated } = require('../middlewares/auth');

router.get('/programas/:escuela',get_programas_escuela);
router.get('/programas_opciones',get_programas_opciones);
router.get('/programas/',get_programas_todos,isUserAuthenticated);
router.get('/programa/:programa',get_programa,isUserAuthenticated);

router.patch('/programa_proceso/:programa',isUserAuthenticated,update_programa_proceso);
router.patch('/programa/:programa',isUserAuthenticated,update_programa);


module.exports = router;