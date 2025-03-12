const { isUserAuthenticated } = require("../middlewares/auth");
const { Router } = require("express");
const router = Router();

const {delete_seccion, delete_link, get_proyectos, create_proyecto, get_proyecto, update_proyecto, delete_proyecto, upload_photo, get_proyectos_promocion, get_secciones_promocion, pin_proyecto} = require("../controllers/proyectos.controller");

router.get("/proyectos", isUserAuthenticated, get_proyectos);
router.get("/promocion/proyectos", isUserAuthenticated, get_proyectos_promocion);
router.get("/proyecto/:id", isUserAuthenticated, get_proyecto)
router.get("/promocion/secciones", isUserAuthenticated, get_secciones_promocion)

router.post("/proyecto", isUserAuthenticated, create_proyecto);
router.post("/proyecto/foto/:id", isUserAuthenticated, upload_photo);
router.post("/proyecto/pin/:id", isUserAuthenticated, pin_proyecto);

router.put("/proyecto/:id", isUserAuthenticated, update_proyecto)

router.delete("/proyecto/link/:id", isUserAuthenticated, delete_link)
router.delete("/proyecto/seccion/:id", isUserAuthenticated, delete_seccion)
router.delete("/proyecto/:id", isUserAuthenticated, delete_proyecto)

module.exports = router
