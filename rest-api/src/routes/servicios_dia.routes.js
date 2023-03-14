const {Router} = require('express');
const router = Router();
const {get_servicios_fecha,get_proximo_servicio} = require('../controllers/servicios_dia.controllers');

router.get('/servicios_por_fecha',get_servicios_fecha);
router.get('/proximo_servicio',get_proximo_servicio);

module.exports = router;