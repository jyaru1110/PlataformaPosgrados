const Programa = require("../models/Programa");

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

const get_programas_todos = async (req, res) => {
  const programas = await Programa.findAll({ order: [["programa", "ASC"]] });
  programas.unshift({ programa: "Todos" });
  res.status(200).send({ programas: programas });
};

const update_programa = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  console.log(body.cuenta);
  try {
    const programa = await Programa.findByPk(id);
    programa.cuenta = body.cuenta;
    programa.duracion = body.duracion;
    await programa.save();
    res.status(200).send({ programa: programa });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error al actualizar el programa" });
  }
};

module.exports = {
  get_programas_escuela,
  get_programas_todos,
  update_programa
};
