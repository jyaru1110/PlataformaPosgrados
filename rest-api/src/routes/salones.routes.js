const {Router} = require('express');
const router = Router();
const {get_salones_todos} = require('../controllers/salones.controllers');

router.get('/salones',get_salones_todos);

module.exports = router;