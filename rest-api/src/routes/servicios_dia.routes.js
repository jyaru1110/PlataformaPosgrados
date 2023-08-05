const {Router} = require('express');
const router = Router();
const {get_servicios_fecha,get_proximo_servicio,get_servicios_todos,get_servicios_isla,get_suma_servicios_dia_isla,create_servicio,update_servicio,delete_servicio,get_servicios_pendientes,get_servicio,cancelar_servicios} = require('../controllers/servicios_dia.controllers');
const { isUserAuthenticated } = require('../middlewares/auth');

router.get('/servicios/:fecha',isUserAuthenticated,get_servicios_fecha);
router.get('/servicios',isUserAuthenticated,get_servicios_todos);
router.get('/servicio/:id',isUserAuthenticated,get_servicio);
router.get('/servicios_pendientes/:fecha',isUserAuthenticated,get_servicios_pendientes);
router.get('/servicios_isla_dia/:dia',isUserAuthenticated,get_servicios_isla);
router.get('/suma_servicios_dia_isla/:fecha_inicio/:fecha_fin',isUserAuthenticated,get_suma_servicios_dia_isla);
router.get('/proximo_servicio',isUserAuthenticated,get_proximo_servicio);

router.post('/create_servicio',isUserAuthenticated,create_servicio);

router.put('/update_servicio/:id',isUserAuthenticated,update_servicio);
router.put('/servicios/cancelar',isUserAuthenticated,cancelar_servicios);

router.delete('/delete_servicio/:id',isUserAuthenticated,delete_servicio);


module.exports = router;