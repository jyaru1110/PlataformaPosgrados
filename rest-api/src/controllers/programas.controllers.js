const hubspotClient = require("../hubspot/hubspotclient")
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
const { Op, where, STRING } = require("sequelize");
const Escuela = require("../models/Escuela");

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

const get_programas_short = async (req, res) => {
  const programas = await Programa.findAll({
    attributes: ["programa"],
    order: [["programa", "ASC"]],
    where: {
      escuela: {
        [Op.not]: "Educación Continua",
      },
      rvoe: {
        [Op.not]: null,
      },
    },
  });
  res.status(200).send({programas});
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
  const { query } = req.query;
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
    order: [
      ["escuela", "ASC"],
      ["programa", "ASC"],
    ],
    where: {
      [Op.or]: [
        { programa: { [Op.iLike]: `%${query}%` } },
        { escuela: { [Op.iLike]: `%${query}%` } },
        { codigo: { [Op.iLike]: `%${query}%` } },
        { rvoe: { [Op.iLike]: `%${query}%` } },
      ],
      [Op.not]: { escuela: "Educación Continua" },
    },
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
  console.log(body);
  try {
    await PeriodoPrograma.bulkCreate(body.nuevosPeriodosProgramas);
    res.status(200).send({ message: "Periodo creado" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error al crear el periodo" });
  }
};

const get_periodos = async (req, res) => {
  const periodos = await Periodo.findAll({
    order: ["periodo_nombre"],
  });
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
    attributes: [[sequelize.fn("COUNT", 1), "total"], "grado"],
    where: {
      escuela: {
        [Op.in]: escuelas,
      },
      rvoe: {
        [Op.not]: null,
      },
      programa_previo: null
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
      rvoe: {
        [Op.not]: null,
      },
      programa_previo: null
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
        label: "Metas",
        data: metas,
        backgroundColor: "#B9975B",
      },
      {
        label: "Inscripciones",
        data: inscripciones,
        backgroundColor: "#00685E",
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
        backgroundColor: ["#00685E", "#ACC6C1"],
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

const get_periodos_programa = async (req, res) => {
  const periodos = await PeriodoPrograma.findAll({
    include: [
      {
        model: Periodo,
        required: false,
        attributes: ["periodo_nombre"],
      },
      {
        model: Programa,
        attributes: ["escuela", "codigo"],
      },
    ],
    attributes: [
      "id",
      "programaPrograma",
      "num_inscripciones",
      "meta_inscripciones",
    ],
    order: [[{ model: Periodo }, "periodo_nombre", "DESC"], "programaPrograma"],
  });

  res.status(200).send(periodos);
};

const get_periodos_escuela = async (req, res) => {
  const query = `SELECT SUM("meta_inscripciones") AS "total_meta_inscripciones", SUM("num_inscripciones") AS "num_inscripciones", "periodo"."periodo_nombre" AS "periodo_nombre", "programa"."escuela" AS "escuela" FROM "periodo_programa" AS "periodo_programa" LEFT OUTER JOIN "periodo" AS "periodo" ON "periodo_programa"."periodoId" = "periodo"."id" LEFT OUTER JOIN "programa" AS "programa" ON "periodo_programa"."programaPrograma" = "programa"."programa" GROUP BY "programa"."escuela", "periodo"."periodo_nombre" ORDER BY "periodo"."periodo_nombre" DESC, "programa"."escuela";`;
  const periodos = await sequelize.query(query, {
    type: sequelize.QueryTypes.SELECT,
  });
  res.status(200).send(periodos);
};

const get_ultima_actualizacion_periodo_escuela = async (req, res) => {
  const {escuela} = req.params;
  const {periodo} = req.query;

  const ultima_fecha = await PeriodoPrograma.findOne({
    attributes: ["updatedAt"],
    include: [
      {
        model: Programa,
        attributes: [],
        where: {
          escuela: escuela,
        }
      },
      {
        model: Periodo,
        attributes: [],
        where: {
          periodo_nombre: periodo
        }
      }
    ],
    order: [["updatedAt", "DESC"]],
  });

  return res.status(200).send(ultima_fecha);
}

const get_periodos_de_escuela = async (req, res) => {
  const { escuela } = req.params;
  const { pagina } = req.query;
  const conditions = {}

  try {
    if (escuela != "Todas") {
      conditions.escuela = escuela;
    }

    const periodos = await AperturasCierres.findAll({
      include: [
        {
          model: Programa,
          attributes: ["escuela", "codigo"],
          where: conditions,
        },
      ],
      offset: (pagina - 1) * 4,
      where:
      {
        fecha_inicio: {
          [Op.gte]: new Date()
        }
      },
      limit: 4,
      attributes: ["fecha_inicio"],
      order: ["fecha_inicio", [{ model: Programa }, "codigo"]],
    });    

    const count = await AperturasCierres.count({
      where: {
        "$programa.escuela$": escuela,
        fecha_inicio: {
          [Op.gte]: new Date()
        }
      },
      include: [
        {
          model: Programa,
          attributes: [],
        },
      ]
    }
    );

    return res.status(200).send({periodos, count });
  }
  catch(e){
    console.log(e)
    return res.status(500).send({message: "Error al obtener los periodos"})
  }
}

const delete_periodo_programa = async (req, res) => {
  const { id } = req.params;
  try {
    await PeriodoPrograma.destroy({ where: { id: id } });
    res.status(200).send({ message: "Periodo eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error al eliminar el periodo" });
  }
};

const delete_apertura = async (req, res) => {
  const { id } = req.params;
  try {
    await AperturasCierres.destroy({ where: { id: id } });
    res.status(200).send({ message: "Apertura eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error al eliminar la apertura" });
  }
};

const delete_puesto_programa = async (req, res) => {
  const { id } = req.params;
  try {
    await PuestoPrograma.destroy({ where: { id: id } });
    res.status(200).send({ message: "Puesto eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error al eliminar el puesto" });
  }
};

const delete_costo_programa = async (req, res) => {
  const { id } = req.params;
  try {
    await CostosPrograma.destroy({ where: { id: id } });
    res.status(200).send({ message: "Costo eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error al eliminar el costo" });
  }
};

const delete_puesto_escuela = async (req, res) => {
  const { id } = req.params;
  try {
    await PuestoEscuela.destroy({ where: { id: id } });
    res.status(200).send({ message: "Puesto eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error al eliminar el puesto" });
  }
};

const update_bulk_periodo_programa = async (req, res) => {
  const { body } = req;
  const { metasToUpdate } = body;

  try {
    Object.keys(metasToUpdate).forEach(async (key) => {
      await PeriodoPrograma.update(metasToUpdate[key], { where: { id: key } });
    });

    res.status(200).send({ message: "Periodos actualizados" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error al actualizar los periodos" });
  }
};

const get_number_of_personas_by_escuela = async (req, res) => {
  const users_by_escuela = await Usuario.findAll({
    attributes: ["escuela", [sequelize.fn("COUNT", 1), "total"]],
    group: ["escuela"],
    order: ["escuela"],
    where: {
      escuela: {
        [Op.not]: "Educación Continua",
      },
    },
  });
  res.status(200).send(users_by_escuela);
};

const get_programas_opciones_metas = async (req, res) => {
  const programas = await Programa.findAll({
    order: [["programa", "ASC"]],
    where: { escuela: { [Op.not]: "Educación Continua" } },
  });
  res.status(200).send({ programas: programas });
};

const get_programas_full = async (req, res) => {
  let escuelas = await Escuela.findAll({
    where: {
      escuela: {
        [Op.not]: "Educación Continua",
      },
    },
    order: [["escuela", "ASC"]],
    include: [
      {
        model: PuestoEscuela,
        required: false,
        attributes: ["puesto", "id"],
        include: [
          {
            model: Usuario,
            required: true,
            attributes: ["titulo", "nombre", "email", "extension", "telefono"],
          },
        ],
        where: {
          puesto: {
            [Op.or]: [
              "Dirección de Posgrados",
              "Jefatura Promoción y Admisiones",
            ],
          },
        },
      },
    ],
  });

  for (let i = 0; i < escuelas.length; i++) {
    const programas = await Programa.findAll({
      where: {
        escuela: escuelas[i].escuela,
        rvoe: { [Op.not]: null },
        esta_activo: true,
      },
      attributes: [
        "programa",
        "codigo",
        "campus",
        "modalidad",
        "tipo",
        "duracion",
        "rvoe",
        "website",
        "encarte",
        "grado"
      ],
      include: [
        {
          model: PuestoPrograma,
          attributes: ["puesto","id"],
          required: false,
          include: [
            {
              model: Usuario,
              attributes: ["nombre", "titulo", "email", "extension", "telefono"],
              required: false,
            },
          ],
        },
      ],
    });
    for(let j = 0; j < programas.length; j++){
      const aperturas_cierres = [];

      const ultima_apertura = await AperturasCierres.findOne({
        where: {
          programaPrograma: programas[j].programa,
          fecha_inicio: {
            [Op.lte]: new Date()
          }
        },
        attributes: ["fecha_inicio","id"],
        order: [["fecha_inicio", "DESC"]]
      });

      if(ultima_apertura){
        aperturas_cierres.push(ultima_apertura);
      }

      const proximaApertura = await AperturasCierres.findOne({
        where: {
          programaPrograma: programas[j].programa,
          fecha_inicio: {
            [Op.gte]: new Date()
          }
        },
        attributes: ["fecha_inicio","id"],
        order: [["fecha_inicio", "ASC"]]
      });

      if(proximaApertura){
        aperturas_cierres.push(proximaApertura);
      }

      

      programas[j].dataValues.ultima_apertura = ultima_apertura;
      programas[j].dataValues.proxima_apertura = proximaApertura;
    }
    escuelas[i].dataValues.programas = programas;
  }

  res.status(200).send(escuelas);
};

const get_contacts = async (req,res) => {
  const programas = await Programa.findAll({
    where: {
      rvoe: {
        [Op.not]: null
      },
      escuela: {
        [Op.ne]: "Educación Continua"
      }
    },
    attributes: ["programa","codigo"]
  });

  const codigos = programas.map(programa => programa.codigo)

  const publicObjectSearchRequest = {
      limit:200,
      properties: ['createdate', 'email', 'firstname','lastname','status_up',"ciclo","posgrado_de_interes_2021"],
      filterGroups: [
        {
            filters: [
            {
                propertyName: 'status_up',
                operator: 'EQ',
                value: "Inscrito Matriculado"
            },
            {
              propertyName: "posgrado_de_interes_2021",
              operator: "IN",
              values: codigos 
            }
          ]
        }
        ],
  }

  try
  {
    const results = [];
    const response = await hubspotClient.crm.contacts.searchApi.doSearch(publicObjectSearchRequest);
    const result = response.results;
    results.push(...result);
    var next = response.paging.next.after;

    while (next != null) {
      publicObjectSearchRequest.after = next;
      const response = await hubspotClient.crm.contacts.searchApi.doSearch(publicObjectSearchRequest);
      results.push(...response.results);
      if (response.paging?.next) next = response.paging.next.after;
      else next = null;
    } 

    return res.status(200).send(results);
  }
  catch(e){
    console.log(e)
  }
}

module.exports = {
  get_programas_opciones_metas,
  get_number_of_personas_by_escuela,
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
  delete_periodo_programa,
  get_periodos_programa,
  delete_apertura,
  delete_puesto_programa,
  delete_costo_programa,
  delete_puesto_escuela,
  update_bulk_periodo_programa,
  get_periodos_escuela,
  get_programas_full,
  get_contacts,
  get_periodos_de_escuela,
  get_ultima_actualizacion_periodo_escuela,
  get_programas_short
};
