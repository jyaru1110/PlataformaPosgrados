const Proceso = require("../models/Proceso");
const Etapa = require("../models/Etapa");
const Programa = require("../models/Programa");
const sequelize = require("../database/database");

const get_procesos = async (req, res) => {
  const procesos = await Proceso.findAll({
    include:[Etapa,Programa],
    order:[
        [{model:Etapa},'numero','ASC'],
    ]
  });
  res.status(200).send({ procesos: procesos });
};

module.exports = {
  get_procesos,
};
