const {Router} = require('express');
const router = Router();
const {get_clase_todos} = require('../controllers/clases.controllers');

router.get('/clases',get_clase_todos);

module.exports = router;