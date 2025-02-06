const { isUserAuthenticated } = require("../middlewares/auth");
const { Router } = require("express");
const router = Router();

const {delete_seccion, delete_link, get_proyectos, create_proyecto, get_proyecto, update_proyecto, delete_proyecto, upload_photo} = require("../controllers/proyectos.controller");

router.get("/proyectos", isUserAuthenticated, get_proyectos);
router.get("/proyecto/:id", isUserAuthenticated, get_proyecto)

router.post("/proyecto", isUserAuthenticated, create_proyecto);
router.post("/proyecto/foto/:id", isUserAuthenticated, upload_photo);

router.put("/proyecto/:id", isUserAuthenticated, update_proyecto)

router.delete("/proyecto/link/:id", isUserAuthenticated, delete_link)
router.delete("/proyecto/seccion/:id", isUserAuthenticated, delete_seccion)
router.delete("/proyecto/:id", isUserAuthenticated, delete_proyecto)

module.exports = router
