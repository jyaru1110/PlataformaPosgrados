const { Router } = require("express");
const router = Router();
const {
  get_procesos,
  create_proceso,
  get_etapas_en_proceso,
  create_evidencia
} = require("../controllers/proceso.controller");
const { isUserAuthenticated } = require("../middlewares/auth");

router.get("/procesos", isUserAuthenticated, get_procesos);
router.get("/etapasprocesos/:tipo", isUserAuthenticated, get_etapas_en_proceso);

router.post("/procesos", isUserAuthenticated, create_proceso);
router.post("/evidencia", isUserAuthenticated, create_evidencia);

module.exports = router;