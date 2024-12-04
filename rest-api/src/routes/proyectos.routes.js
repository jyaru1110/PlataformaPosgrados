const { isUserAuthenticated } = require("../middlewares/auth");
const { Router } = require("express");
const router = Router();

const { get_proyectos, create_proyecto, get_proyecto, update_proyecto, delete_proyecto} = require("../controllers/proyectos.controller");

router.get("/proyectos", isUserAuthenticated, get_proyectos);
router.get("/proyecto/:id", isUserAuthenticated, get_proyecto)

router.post("/proyecto", isUserAuthenticated, create_proyecto);

router.put("/proyecto/:id", isUserAuthenticated, update_proyecto)

router.delete("/proyecto/:id", isUserAuthenticated, delete_proyecto)

module.exports = router
