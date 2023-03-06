const {Router} = require('express');
const router = Router();
const {get_servicios_fecha,get_proximo_servicio} = require('../controllers/servicios_dia.controllers');

router.get('/get_servicios_fecha',get_servicios_fecha);
router.get('/get_proximo_servicio',get_proximo_servicio);

module.exports = router;