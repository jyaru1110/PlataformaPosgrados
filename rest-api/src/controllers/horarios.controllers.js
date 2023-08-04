const Horario = require("../models/Horario");
const Servicios_dia = require("../models/Servicios_dia");
const Semana = require("../models/Semana");
const Notificaciones = require("../models/Notificaciones");
const { Op } = require("sequelize");
const send = require("../mail/nodemailerprovider");
const sequelize = require("../database/database");
const environment = process.env.ENV;
const dias =
  environment == "Production"
    ? {
        Lunes: 1,
        Martes: 2,
        Miércoles: 3,
        Jueves: 4,
        Viernes: 5,
        Sábado: 6,
        Domingo: 0,
      }
    : {
        Lunes: 0,
        Martes: 1,
        Miércoles: 2,
        Jueves: 3,
        Viernes: 4,
        Sábado: 5,
        Domingo: 6,
      };

const get_horarios_todos = async (req, res) => {
  const rol = req.user.dataValues.rol;
  var query = "";
  if (rol == "Gestor") {
    query = "select * from horario;";
  } else {
    query =
      "select * from horario inner join programa on programa.programa = horario.programa where programa.escuela = '" +
      req.user.dataValues.escuela +
      "';";
  }
  const horarios = await sequelize.query(query);
  res.status(200).send({ horarios: horarios });
};

const get_horario = async (req, res) => {
  const { id } = req.params;
  const horario = await Horario.findAll({
    where: { id_horario: id },
  });
  res.status(200).send({ horario: horario });
};

const delete_horario = async (req, res) => {
  const rol = req.user.dataValues.rol;
  const { id } = req.params;
  if (rol == "Gestor") {
    const notificaciones = await Notificaciones.destroy({
      where: { id_horario: id },
    });
    const horario = await Horario.destroy({
      where: { id_horario: id },
    });
    res.status(200).send({ horario: horario });
  } else {
    const notificacion = await Notificaciones.create({
      id_horario: id,
      id_usuario: req.user.dataValues.id,
      tipo: "Cancelacion",
    });
    await send(
      "mx_eventos@up.edu.mx",
      req.user.dataValues.nombre + " ha creado una solicitud de servicio",
      "Se ha creado una solicitud de servicio, revisala en "
    );
    res.status(200).send({ notificacion: notificacion });
  }
};

const create_horario = async (req, res) => {
  const rol = req.user.dataValues.rol;
  var notificacion;
  const {
    hora_inicio,
    hora_fin,
    dia,
    salon,
    fecha_fin,
    no_clase,
    programa,
    num_alumnos,
    hora_servicio_inicio,
    hora_servicio_fin,
  } = req.body;
  var fecha_inicio = req.body.fecha_inicio;
  const servicios_repetidos = await Servicios_dia.findAll({
    where: {
      salon_id: salon,
      dia: dia,
      fecha: {
        [Op.between]: [fecha_inicio, fecha_fin],
      },
      no_clase: no_clase,
      programa: programa,
      num_servicios: num_alumnos,
      hora_servicio_inicio: hora_servicio_inicio,
      hora_servicio_fin: hora_servicio_fin,
    },
  });
  console.log(servicios_repetidos);
  if (servicios_repetidos.length > 0) {
    res
      .status(500)
      .send({
        message: "Verfifica las fechas, hay servicios identicos ya registrados",
      });
    return;
  }

  const semana = await Semana.findOne({});
  var fecha_fin_semana_date = new Date(semana.dataValues.fin_semana);
  var notificacion;
  if (fecha_inicio <= semana.dataValues.fin_semana && rol !== "Gestor") {
    var fecha_inicio_i = new Date(fecha_inicio);
    fecha_inicio_i.setDate(
      fecha_inicio_i.getDate() + ((dias[dia] - fecha_inicio_i.getDay() + 7) % 7)
    );
    fecha_inicio = fecha_inicio_i.toISOString().slice(0, 10);
    while (
      fecha_inicio_i <= fecha_fin_semana_date &&
      fecha_inicio <= fecha_fin
    ) {
      notificacion = await Notificaciones.create({
        hora_inicio: hora_inicio,
        hora_fin: hora_fin,
        dia: dia,
        salon: salon,
        fecha_inicio: fecha_inicio,
        fecha_fin: semana.dataValues.fin_semana,
        no_clase: no_clase,
        programa: programa,
        num_alumnos: num_alumnos,
        hora_servicio_inicio: hora_servicio_inicio,
        hora_servicio_fin: hora_servicio_fin,
        id_usuario: req.user.dataValues.id,
        tipo: "Nuevo",
      });
      await send(
        "mx_eventos@up.edu.mx",
        req.user.dataValues.nombre +
          " ha creado una solicitud de nuevo servicio",
        notificacion,
        req.user.dataValues.nombre
      );
      fecha_inicio_i.setDate(fecha_inicio_i.getDate() + 7);
      fecha_inicio = fecha_inicio_i.toISOString().slice(0, 10);
    }
    const suma =
      dias[dia] !== 5
        ? (dias[dia] - fecha_fin_semana_date.getDay() + 7) % 7
        : 1;
    fecha_fin_semana_date.setDate(fecha_fin_semana_date.getDate() + suma);
    fecha_inicio = fecha_fin_semana_date.toISOString().slice(0, 10);
    if (fecha_inicio > fecha_fin && notificacion) {
      res.status(200).send({ notificacion: notificacion });
      return;
    }
  }
  if (fecha_fin == fecha_inicio) {
    var fecha_inicio_i = new Date(fecha_inicio);
    if (dias[dia] !== fecha_inicio_i.getDay()) {
      res.status(500).send({ message: "Error en las fechas" });
      return;
    }
    const servicio = Servicios_dia.create({
      hora_inicio: hora_inicio,
      hora_fin: hora_fin,
      dia: dia,
      salon_id: salon,
      fecha: fecha_inicio,
      no_clase: no_clase,
      programa: programa,
      hora_servicio_inicio: hora_servicio_inicio,
      hora_servicio_fin: hora_servicio_fin,
      num_servicios: num_alumnos,
    });
    res.status(200).send({ servicio: servicio });
    return;
  }
  if (fecha_inicio > fecha_fin) {
    res.status(500).send({ message: "Error en las fechas" });
    return;
  } else {
    const horario = await Horario.create({
      hora_inicio: hora_inicio,
      hora_fin: hora_fin,
      dia: dia,
      salon: salon,
      fecha_inicio: fecha_inicio,
      fecha_fin: fecha_fin,
      no_clase: no_clase,
      programa: programa,
      hora_servicio_inicio: hora_servicio_inicio,
      hora_servicio_fin: hora_servicio_fin,
      num_alumnos: num_alumnos,
    });
    const servicios_creados = await Servicios_dia.findAll({
      where: {
        id_horario: horario.id_horario,
      },
    });
    if (servicios_creados.length == 0) {
      await horario.destroy();
      res
        .status(500)
        .send({ message: "No se creó ningún servicio revisa las fechas" });
      return;
    }
    res.status(200).send({ horario: horario });
  }
};

const update_horario = async (req, res) => {
  const rol = req.user.dataValues.rol;
  const { id } = req.params;
  const {
    hora_inicio,
    hora_fin,
    hora_servicio_fin,
    hora_servicio_inicio,
    salon,
    fecha_inicio,
    fecha_fin,
    no_clase,
    programa,
    num_alumnos,
  } = req.body;
  console.log(req.body)
  const nuevo_horario = await Horario.update(
    {
      hora_fin: hora_fin,
      hora_inicio: hora_inicio,
      hora_servicio_fin: hora_servicio_fin,
      hora_servicio_inicio: hora_servicio_inicio,
      salon: salon,
      no_clase: no_clase,
      programa: programa,
      num_alumnos: num_alumnos,
    },
    {
      where: {
        id_horario: id,
      },
    }
  );
  const nuevos_servicios = await Servicios_dia.update(
    {
      hora_fin: hora_fin,
      hora_inicio: hora_inicio,
      hora_servicio_fin: hora_servicio_fin,
      hora_servicio_inicio: hora_servicio_inicio,
      salon_id: salon,
      no_clase: no_clase,
      programa: programa,
      num_servicios: num_alumnos,
    },
    {
      where: {
        id_horario: id,
        fecha:{
          [Op.between]: [fecha_inicio, fecha_fin],
        },
        estado: "Pendiente",
      },
    }
  );
  res.status(200).send({horario:nuevo_horario})
};

module.exports = {
  get_horarios_todos,
  get_horario,
  delete_horario,
  create_horario,
  update_horario,
};
