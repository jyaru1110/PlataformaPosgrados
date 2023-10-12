const Proceso = require("../models/Proceso");
const Etapa = require("../models/Etapa");
const Programa = require("../models/Programa");
const sequelize = require("../database/database");

const get_procesos = async (req, res) => {
  const procesos = await Proceso.findAll({
    include: [Etapa, Programa],
    order: [[{ model: Etapa }, "numero", "ASC"]],
  });
  res.status(200).send({ procesos: procesos });
};

const create_proceso = async (req, res) => {
  const body = req.body;
  if (body.tipo_proceso == "nuevo") {
    await Programa.create({
      tipo: body.tipo,
      programa: body.programa,
      grado: body.grado,
      codigo: body.codigo,
      escuela: body.escuela,
      modalidad: body.modalidad,
      duracion: body.duracion,
      tipo_programa: "Nuevo",
    });
    const proceso = await Proceso.create({
      programaPrograma: body.programa,
      tipo: "Nuevo",
    });
    return res.status(200).send({ proceso: proceso });
  } else {
    if (body.programa_destino == "nuevo") {
      await Programa.create({
        programa_previo: body.programa_origen,
        tipo: body.tipo,
        programa: body.programa,
        grado: body.grado,
        codigo: body.codigo,
        escuela: body.escuela,
        modalidad: body.modalidad,
        duracion: body.duracion,
        tipo_programa: "Actualización",
      });
      const proceso = await Proceso.create({
        programaPrograma: body.programa,
        tipo: "Actualización",
      });
      return res.status(200).send({ proceso: proceso });
    }
    const proceso = await Proceso.create({
      programaPrograma: body.programa_origen,
      tipo: "Actualización",
    });
    return res.status(200).send({ proceso: proceso });
  }
};

module.exports = {
  get_procesos,
  create_proceso,
};
