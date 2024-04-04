const { Router } = require("express");
const router = Router();
const {
  get_programas_escuela,
  get_programas_opciones,
  update_programa_proceso,
  get_programas_todos,
  get_programa,
  update_programa,
  create_programa,
  create_puesto,
  create_puesto_escuela,
  create_costos,
  create_aperturas,
  create_periodo,
  create_periodo_programa,
  get_periodos
} = require("../controllers/programas.controllers");
const { isUserAuthenticated } = require("../middlewares/auth");

router.get("/programas/:escuela", get_programas_escuela);
router.get("/programas_opciones/", get_programas_opciones);
router.get("/programas/", get_programas_todos, isUserAuthenticated);
router.get("/programa/:programa", get_programa, isUserAuthenticated);
router.get("/periodos", get_periodos, isUserAuthenticated);

router.patch(
  "/programa_proceso/:programa",
  isUserAuthenticated,
  update_programa_proceso
);
router.patch("/programa/:programa", isUserAuthenticated, update_programa);

router.post("/programa", isUserAuthenticated, create_programa);
router.post("/programa/puesto", isUserAuthenticated, create_puesto);
router.post("/escuela/puesto", isUserAuthenticated, create_puesto_escuela);
router.post("/programa/costo", isUserAuthenticated, create_costos);
router.post("/programa/apertura", isUserAuthenticated, create_aperturas);
router.post("/periodo", isUserAuthenticated, create_periodo);
router.post("/programa/periodo", isUserAuthenticated, create_periodo_programa);

module.exports = router;
