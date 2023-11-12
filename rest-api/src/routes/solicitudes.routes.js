const {Router} = require('express');
const router = Router();
const {get_solicitudes,aceptar_solicitud,rechazar_solicitud,cancelar_solicitud,demo_mail} = require('../controllers/solicitudes.controllers');
const { isUserAuthenticated } = require('../middlewares/auth');

router.get('/solicitudes',isUserAuthenticated,get_solicitudes);

router.put('/solicitudes/aceptar/:id',isUserAuthenticated,aceptar_solicitud);
router.put('/solicitudes/rechazar/:id',isUserAuthenticated,rechazar_solicitud);

router.delete('/solicitudes/cancelar/:id',isUserAuthenticated,cancelar_solicitud);


module.exports = router;
