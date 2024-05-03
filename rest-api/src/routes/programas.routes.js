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
  get_periodos,
  bulk_update_aperturas,
  get_total_programas,
  get_programas_por_tipo,
  get_metas_por_periodo,
  get_metas_periodo,
  get_periodos_programa
} = require("../controllers/programas.controllers");
const { isUserAuthenticated } = require("../middlewares/auth");

router.get("/programas/periodos", isUserAuthenticated, get_periodos_programa);
router.get("/programas/:escuela", isUserAuthenticated, get_programas_escuela);
router.get("/programas_opciones/", isUserAuthenticated, get_programas_opciones);
router.get("/programas/", isUserAuthenticated, get_programas_todos);
router.get("/programa/:programa", isUserAuthenticated, get_programa);
router.get("/periodos", isUserAuthenticated, get_periodos);
router.get("/totalprogramas", isUserAuthenticated, get_total_programas);
router.get("/programastipo", isUserAuthenticated, get_programas_por_tipo);
router.get("/metasporperiodo", isUserAuthenticated, get_metas_por_periodo);
router.get("/metas/:periodo", isUserAuthenticated, get_metas_periodo);

router.patch(
  "/programa_proceso/:programa",
  isUserAuthenticated,
  update_programa_proceso
);
router.patch("/programa/:programa", isUserAuthenticated, update_programa);
router.patch("/aperturas", isUserAuthenticated, bulk_update_aperturas);

router.post("/programa", isUserAuthenticated, create_programa);
router.post("/programa/puesto", isUserAuthenticated, create_puesto);
router.post("/escuela/puesto", isUserAuthenticated, create_puesto_escuela);
router.post("/programa/costo", isUserAuthenticated, create_costos);
router.post("/programa/apertura", isUserAuthenticated, create_aperturas);
router.post("/periodo", isUserAuthenticated, create_periodo);
router.post("/programa/periodo", isUserAuthenticated, create_periodo_programa);

module.exports = router;
