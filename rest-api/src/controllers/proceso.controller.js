const Proceso = require("../models/Proceso");
const EtapaProceso = require("../models/EtapaProceso");
const Etapa = require("../models/Etapa");

const get_procesos = async (req, res) => {
  const procesos = await Proceso.findOne({
    include:[Etapa]
  });
  res.status(200).send({ procesos: procesos });
};

module.exports = {
  get_procesos,
};
