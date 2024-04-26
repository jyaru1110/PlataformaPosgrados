const Programa = require("../models/Programa");
const Proceso = require("../models/Proceso");
const CostosPrograma = require("../models/CostosPrograma");
const AperturasCierres = require("../models/AperturasCierres");
const PuestoPrograma = require("../models/PuestoPrograma");
const Usuario = require("../models/Usuario");
const PuestoEscuela = require("../models/PuestoEscuela");
const Periodo = require("../models/Periodo");
const PeriodoPrograma = require("../models/PeriodoPrograma");
const sequelize = require("../database/database");
const { Op } = require("sequelize");

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
        model: PeriodoPrograma,
        required: false,
        include: [
          {
            model: Periodo,
            required: false,
          },
          { model: AperturasCierres, required: false },
        ],
      },
      {
        model: PuestoPrograma,
        required: false,
        include: [
          {
            model: Usuario,
            attributes: ["nombre", "foto"],
            required: false,
          },
        ],
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

const create_programa = async (req, res) => {
  const { body } = req;
  try {
    const programa = await Programa.create(body);
    res.status(200).send(programa);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error al crear el programa" });
  }
};

const create_puesto = async (req, res) => {
  const { body } = req;
  try {
    await PuestoPrograma.bulkCreate(body.nuevosPuestosPrograma);
    res.status(200).send({ message: "Puesto guardado" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error al crear el puesto" });
  }
};

const create_puesto_escuela = async (req, res) => {
  const { body } = req;
  try {
    await PuestoEscuela.bulkCreate(body.nuevosPuestosEscuela);
    res.status(200).send({ message: "Puesto guardado" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error al crear el puesto" });
  }
};

const create_costos = async (req, res) => {
  const { body } = req;
  try {
    await CostosPrograma.bulkCreate(body.nuevosCostos);
    res.status(200).send({ message: "Costo guardado" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error al crear el costo" });
  }
};

const create_aperturas = async (req, res) => {
  const { body } = req;
  try {
    await AperturasCierres.bulkCreate(body.nuevasAperturas);
    res.status(200).send({ message: "Apertura guardada" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error al crear la apertura" });
  }
};

const create_periodo = async (req, res) => {
  const { body } = req;
  try {
    await Periodo.create(body);
    res.status(200).send({ message: "Periodo creado" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error al crear el periodo" });
  }
};

const create_periodo_programa = async (req, res) => {
  const { body } = req;
  try {
    await PeriodoPrograma.bulkCreate(body.nuevosPeriodosProgramas);
    res.status(200).send({ message: "Periodo creado" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error al crear el periodo" });
  }
};

const get_periodos = async (req, res) => {
  const periodos = await Periodo.findAll();
  res.status(200).send(periodos);
};

const bulk_update_aperturas = async (req, res) => {
  const aperturas = req.body;

  try {
    aperturas.forEach(async (element) => {
      await AperturasCierres.update(
        {
          [element.field]: element.value,
        },
        { where: { id: element.id } }
      );
    });

    return res.status(200).send({ message: "Aperturas actualizadas" });
  } catch (e) {
    return res
      .status(500)
      .send({ message: "Error al actualizar las aperturas" });
  }
};

const get_total_programas = async (req, res) => {
  const { escuelas } = req.query;

  const resultado = await Programa.findAll({
    attributes: [
      [sequelize.fn("COUNT", sequelize.col("programa")), "total"],
      "grado",
    ],
    where: {
      escuela: {
        [Op.in]: escuelas,
      },
    },
    group: ["grado"],
  });

  res.status(200).send(resultado);
};

const get_programas_por_tipo = async (req, res) => {
  const { escuelas } = req.query;
  const resultado = await Programa.findAll({
    attributes: [
      [sequelize.fn("COUNT", sequelize.col("programa")), "total"],
      "tipo",
    ],
    where: {
      escuela: {
        [Op.in]: escuelas,
      },
    },
    group: ["tipo"],
  });

  res.status(200).send(resultado);
};

const get_metas_por_periodo = async (req, res) => {
  const { escuelas } = req.query;

  const resultado = await PeriodoPrograma.findAll({
    attributes: [
      [
        sequelize.fn("SUM", sequelize.col("num_inscripciones")),
        "num_inscripciones",
      ],
      [
        sequelize.fn("SUM", sequelize.col("meta_inscripciones")),
        "meta_inscripciones",
      ],
    ],
    include: [
      {
        model: Programa,
        where: {
          escuela: {
            [Op.in]: escuelas,
          },
        },
        attributes: [],
      },
      {
        model: Periodo,
        attributes: ["periodo_nombre"],
      },
    ],
    order: [[{ model: Periodo }, "periodo_nombre", "ASC"]],
    group: ["periodo.id"],
  });

  const periodos = resultado.map(
    (element) => element.dataValues.periodo.periodo_nombre
  );

  const inscripciones = resultado.map(
    (element) => element.dataValues.num_inscripciones
  );

  const metas = resultado.map(
    (element) => element.dataValues.meta_inscripciones
  );

  const data_set = {
    labels: periodos,
    datasets: [
      {
        label: "Inscripciones",
        data: inscripciones,
        backgroundColor: "#C9B608",
      },
      {
        label: "Metas",
        data: metas,
        backgroundColor: "#227B76",
      },
    ],
  };

  res.status(200).send(data_set);
};

const get_metas_periodo = async (req, res) => {
  const { periodo } = req.params;
  const { escuelas } = req.query;

  const resultado = await PeriodoPrograma.findAll({
    attributes: [
      [
        sequelize.fn("SUM", sequelize.col("num_inscripciones")),
        "num_inscripciones",
      ],
      [
        sequelize.fn("SUM", sequelize.col("meta_inscripciones")),
        "meta_inscripciones",
      ],
    ],
    include: [
      {
        model: Programa,
        attributes: [],
        where: {
          escuela: {
            [Op.in]: escuelas,
          },
        },
      },
    ],
    where: {
      periodoId: periodo,
    },
    group: ["periodoId"],
  });

  const data = {
    labels: ["Inscripciones", "Sin inscribir"],
    datasets: [
      {
        label: "Número de inscripciones",
        data: [
          resultado[0]?.dataValues.num_inscripciones,
          resultado[0]?.dataValues.meta_inscripciones -
            resultado[0]?.dataValues.num_inscripciones,
        ],
        backgroundColor: ["#227B76", "#C9B608"],
        hoverOffset: 4,
      },
    ],
  };

  res.status(200).send({
    data: data,
    percentage:
      (resultado[0]?.dataValues.num_inscripciones /
        resultado[0]?.dataValues.meta_inscripciones) *
      100,
  });
};

module.exports = {
  get_programas_escuela,
  get_programas_opciones,
  update_programa_proceso,
  get_programas_todos,
  get_programa,
  update_programa,
  create_programa,
  create_puesto,
  create_puesto_escuela,
  create_aperturas,
  create_costos,
  create_periodo,
  create_periodo_programa,
  get_periodos,
  bulk_update_aperturas,
  get_total_programas,
  get_metas_por_periodo,
  get_programas_por_tipo,
  get_metas_periodo,
};
