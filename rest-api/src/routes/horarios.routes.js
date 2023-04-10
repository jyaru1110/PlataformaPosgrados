const {Router} = require('express');
const router = Router();
const {get_horarios_todos,delete_horario,create_horario,update_horario} = require('../controllers/horarios.controllers');


router.get('/horarios',get_horarios_todos);
router.delete('/delete_horario/:id',delete_horario);
router.post('/create_horario',create_horario);
router.put('/update_horario/:id',update_horario);

module.exports = router;