const {Router} = require('express');
const router = Router();
const {get_programas_escuela} = require('../controllers/programas.controllers');
const {get_programas_todos} = require('../controllers/programas.controllers');

router.get('/programas/:escuela',get_programas_escuela);
router.get('/programas',get_programas_todos);


module.exports = router;