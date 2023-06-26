const {Router} = require('express');
const router = Router();
const {get_horarios_todos,delete_horario,create_horario,update_horario, get_horario} = require('../controllers/horarios.controllers');
const { isUserAuthenticated } = require('../middlewares/auth');


router.get('/horarios',isUserAuthenticated,get_horarios_todos);
router.get('/horario/:id',isUserAuthenticated,get_horario);
router.delete('/delete_horario/:id',isUserAuthenticated,delete_horario);
router.post('/create_horario',isUserAuthenticated,create_horario);
router.put('/update_horario/:id',isUserAuthenticated,update_horario);

module.exports = router;