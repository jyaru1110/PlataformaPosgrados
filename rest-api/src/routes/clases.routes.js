const {Router} = require('express');
const router = Router();
const {get_clase_todos,create_clase} = require('../controllers/clases.controllers');

router.get('/clases',get_clase_todos);
router.post('/clases',create_clase);

module.exports = router;