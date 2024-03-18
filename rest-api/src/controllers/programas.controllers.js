const Programa = require("../models/Programa");
const Proceso = require("../models/Proceso");
const CostosPrograma = require("../models/CostosPrograma");
const AperturasCierres = require("../models/AperturasCierres");

const get_programas_escuela = async (req, res) => {
  const { escuela } = req.params;
  const programas = await Programa.findAll({
    where: {
      escuela: escuela,
    },
  });
  programas.unshift({ programa: "Todos" });
  res.status(200).send({ programas: programas });
};

const get_programas_opciones = async (req, res) => {
  const programas = await Programa.findAll({ order: [["programa", "ASC"]] });
  programas.unshift({ programa: "Todos" });
  res.status(200).send({ programas: programas });
};

const update_programa_proceso = async (req, res) => {
  const { programa } = req.params;
  const { body } = req;
  try {
    const programa_editado = await Programa.findByPk(programa);
    body.duracion ? (programa_editado.duracion = body.duracion) : null;
    body.modalidad ? (programa_editado.modalidad = body.modalidad) : null;
    body.campus ? (programa_editado.campus = body.campus) : null;
    body.rvoe ? (programa_editado.rvoe = body.rvoe) : null;
    await programa_editado.save();

    if (body.id_proceso) {
      const proceso = await Proceso.findByPk(body.id_proceso);
      proceso.notas = body.notas;
      await proceso.save();
      return res
        .status(200)
        .send({ programa: programa_editado, proceso: proceso });
    }

    res.status(200).send({ programa: programa_editado });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error al actualizar el programa" });
  }
};

const get_programas_todos = async (req, res) => {
  const programas = await Programa.findAll({
    attributes: [
      "programa",
      "grado",
      "escuela",
      "codigo",
      "campus",
      "tipo",
      "modalidad",
      "duracion",
      "creditos",
      "year_inicio",
      "num_materias",
      "num_materias_ingles",
      "rvoe",
      "fecha_rvoe",
    ],
  });
  res.status(200).send(programas);
};

const get_programa = async (req, res) => {
  const { programa } = req.params;
  const programa_info = await Programa.findByPk(programa, {
    include: [
      {
        model: CostosPrograma,
        required: false,
      },
      {
        model: AperturasCierres,
        required: false,
      },
    ],
  });
  if (!programa_info) {
    return res.status(404).send({ message: "Programa no encontrado" });
  }
  res.status(200).send(programa_info);
};

const update_programa = async (req, res) => {
  const body = req.body;
  const { programa } = req.params;
  try {
    await Programa.update(body, { where: { programa: programa } });
    res.status(200).send({ message: "Programa actualizado" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error al actualizar el programa" });
  }
};

module.exports = {
  get_programas_escuela,
  get_programas_opciones,
  update_programa_proceso,
  get_programas_todos,
  get_programa,
  update_programa,
};
