const { isUserAuthenticated } = require("../middlewares/auth");
const { Router } = require("express");
const router = Router();

const { get_proyectos } = require("../controllers/proyectos.controller");

router.get("/proyectos", isUserAuthenticated, get_proyectos);

module.exports = router
