const { isUserAuthenticated } = require("../middlewares/auth");
const { Router } = require("express");
const router = Router();

const { get_proyectos, create_proyecto, get_proyecto } = require("../controllers/proyectos.controller");

router.get("/proyectos", isUserAuthenticated, get_proyectos);
router.get("/proyecto/:id", isUserAuthenticated, get_proyecto)

router.post("/proyecto", isUserAuthenticated, create_proyecto);

module.exports = router
