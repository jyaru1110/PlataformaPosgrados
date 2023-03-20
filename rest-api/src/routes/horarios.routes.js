const {Router} = require('express');
const router = Router();
const {get_horarios_todos} = require('../controllers/horarios.controllers');

router.get('/horarios',get_horarios_todos);

module.exports = router;