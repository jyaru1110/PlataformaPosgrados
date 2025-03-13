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
  get_periodos_programa,
  delete_periodo_programa,
  delete_apertura,
  delete_puesto_programa,
  delete_costo_programa,
  delete_puesto_escuela,
  get_periodos_escuela,
  update_bulk_periodo_programa,
  get_number_of_personas_by_escuela,
  get_programas_opciones_metas,
  get_programas_full,
  get_contacts,
  get_periodos_de_escuela,
  get_ultima_actualizacion_periodo_escuela,
  get_programas_short
} = require("../controllers/programas.controllers");
const { isUserAuthenticated } = require("../middlewares/auth");

router.get("/programas/periodos", isUserAuthenticated, get_periodos_programa);
router.get("/programas/short", isUserAuthenticated, get_programas_short);
router.get("/escuelas/periodos", isUserAuthenticated, get_periodos_escuela);
router.get("/escuelas/periodos/:escuela", isUserAuthenticated, get_periodos_escuela);
router.get("/escuela/periodos/:escuela", isUserAuthenticated, get_periodos_de_escuela);
router.get("/periodos/last/:escuela", isUserAuthenticated, get_ultima_actualizacion_periodo_escuela);
router.get("/programas/:escuela", isUserAuthenticated, get_programas_escuela);
router.get("/programas_metas", isUserAuthenticated, get_programas_opciones_metas);
router.get("/programas_opciones", isUserAuthenticated, get_programas_opciones);
router.get("/escuelas/full", isUserAuthenticated, get_programas_full);
router.get("/programas/", isUserAuthenticated, get_programas_todos);
router.get("/programa/:programa", isUserAuthenticated, get_programa);
router.get("/periodos", isUserAuthenticated, get_periodos);
router.get("/totalprogramas", isUserAuthenticated, get_total_programas);
router.get("/programastipo", isUserAuthenticated, get_programas_por_tipo);
router.get("/metasporperiodo", isUserAuthenticated, get_metas_por_periodo);
router.get("/metas/:periodo", isUserAuthenticated, get_metas_periodo);
router.get("/escuelas/numberofpersonas", isUserAuthenticated, get_number_of_personas_by_escuela);

router.get("/contacts", isUserAuthenticated, get_contacts)

router.put("/programas/periodos", isUserAuthenticated, update_bulk_periodo_programa);

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

router.delete("/programa/periodo/:id", isUserAuthenticated, delete_periodo_programa);
router.delete("/aperturas/:id", isUserAuthenticated, delete_apertura);
router.delete("/programa/puesto/:id", isUserAuthenticated, delete_puesto_programa);
router.delete("/programa/costo/:id", isUserAuthenticated, delete_costo_programa);
router.delete("/escuela/puesto/:id", isUserAuthenticated, delete_puesto_escuela);

module.exports = router;
