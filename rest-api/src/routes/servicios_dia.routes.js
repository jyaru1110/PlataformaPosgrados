const {Router} = require('express');
const router = Router();
const {get_servicios_fecha,get_proximo_servicio,get_servicios_todos,get_servicios_isla,get_suma_servicios_dia_isla,create_servicio,update_servicio,delete_servicio,get_servicios_pendientes} = require('../controllers/servicios_dia.controllers');

router.get('/servicios/:fecha',get_servicios_fecha);
router.get('/servicios',get_servicios_todos);
router.get('/servicios_pendientes/:fecha',get_servicios_pendientes);
router.get('/servicios_isla_dia/:dia',get_servicios_isla);
router.get('/suma_servicios_dia_isla/:fecha_inicio/:fecha_fin',get_suma_servicios_dia_isla);
router.get('/proximo_servicio',get_proximo_servicio);

router.post('/create_servicio',create_servicio);

router.put('/update_servicio/:id',update_servicio);

router.delete('/delete_servicio/:id',delete_servicio);

module.exports = router;