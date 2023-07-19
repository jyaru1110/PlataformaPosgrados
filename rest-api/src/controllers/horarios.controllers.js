const Horario = require("../models/Horario");
const Servicios_dia = require("../models/Servicios_dia");
const Semana = require("../models/Semana");
const Notificaciones = require("../models/Notificaciones");
const { Op } = require("sequelize");
const send = require("../mail/nodemailerprovider");
const sequelize = require("../database/database");
const dias = {
  Lunes: 1,
  Martes: 2,
  Miércoles: 3,
  Jueves: 4,
  Viernes: 5,
  Sábado: 6,
  Domingo: 0,
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
      "0246759@up.edu.mx",
      req.user.dataValues.nombre + " ha creado una solicitud de servicio",
      "Se ha creado una solicitud de servicio, revisala en "
    );
    res.status(200).send({ notificacion: notificacion });
  }
};

const create_horario = async (req, res) => {
  const rol = req.user.dataValues.rol;
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
  const semana = await Semana.findOne({});
  var fecha_fin_semana_date = new Date(semana.dataValues.fin_semana);
  console.log("fecha fin semana: " + fecha_fin_semana_date)
  var notificacion;
  if (fecha_inicio <= semana.dataValues.fin_semana && rol !== "Gestor") {
    console.log("entra a la primera validación de fecha")
    var fecha_inicio_i = new Date(fecha_inicio);
    fecha_inicio_i.setDate(
      fecha_inicio_i.getDate() + ((dias[dia] - fecha_inicio_i.getDay() + 7) % 7)
    );
    fecha_inicio = fecha_inicio_i.toISOString().slice(0, 10);
    console.log("fecha inicio: " + fecha_inicio)
    while (
      fecha_inicio_i <= fecha_fin_semana_date &&
      fecha_inicio <= fecha_fin
    ) {
      console.log("entra al while de la primera")
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
        "0246759@up.edu.mx",
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
    if (fecha_inicio > fecha_fin) {
      res.status(200).send({ notificacion: notificacion });
      return;
    }
  }
  if (fecha_fin == fecha_inicio) {
    //valida que el día concuerde con la fecha
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

  var notificacion_dia;
  const { id } = req.params;
  const {
    hora_inicio,
    hora_fin,
    hora_servicio_fin,
    hora_servicio_inicio,
    dia,
    salon,
    fecha_inicio,
    fecha_fin,
    no_clase,
    programa,
    num_alumnos,
  } = req.body;
  const horario = await Horario.findOne({
    where: { id_horario: id },
  });
  if (
    horario.dataValues.num_alumnos == num_alumnos &&
    horario.dataValues.fecha_inicio == fecha_inicio &&
    fecha_fin == horario.dataValues.fecha_fin &&
    dia == horario.dataValues.dia &&
    horario.dataValues.hora_servicio_inicio == hora_servicio_inicio &&
    horario.dataValues.hora_fin == hora_servicio_fin
  ) {
    horario.hora_inicio = hora_inicio;
    horario.hora_fin = hora_fin;
    horario.salon = salon;
    horario.no_clase = no_clase;
    horario.programa = programa;
    await horario.save();
    const servicios = await Servicios_dia.update(
      {
        hora_inicio: hora_inicio,
        hora_fin: hora_fin,
        salon_id: salon,
        no_clase: no_clase,
        programa: programa,
      },
      {
        where: {
          id_horario: id,
        },
      }
    );
    res.status(200).send({ servicios: servicios });
  } else if (dia !== horario.dataValues.dia) {
    await Servicios_dia.destroy({
      where: {
        id_horario: id,
        estado: "Pendiente",
      },
    });
    if (rol !== "Gestor") {
      const servicios = await Servicios_dia.findAll({
        where: {
          id_horario: id,
          estado: "Confirmado",
        },
      });
      servicios.forEach(async (servicio) => {
        notificacion_dia = await Notificaciones.create({
          id_servicio: servicio.dataValues.id,
          fecha_inicio: servicio.dataValues.fecha,
          num_alumnos: servicio.dataValues.num_servicios,
          hora_inicio: servicio.dataValues.hora_inicio,
          hora_fin: servicio.dataValues.hora_fin,
          salon: servicio.dataValues.salon_id,
          no_clase: servicio.dataValues.no_clase,
          programa: servicio.dataValues.programa,
          hora_servicio_inicio: servicio.dataValues.hora_servicio_inicio,
          hora_servicio_fin: servicio.dataValues.hora_servicio_fin,
          id_usuario: req.user.dataValues.id,
          tipo: "Cancelacion",
        });
        await send(
          "0246759@up.edu.mx",
          req.user.dataValues.nombre +
            " ha creado una solicitud de cancelacion",
          notificacion_dia,
          req.user.dataValues.nombre
        );
      });

      //aquí deberá suceder el flujo para crear los servicios correspondientes creo un nuevo horario con todo LO NUEVO
      const semana = await Semana.findOne({});
      if (fecha_inicio <= semana.dataValues.fin_semana) {
        let fecha_inicio_i = new Date(fecha_inicio);
        fecha_inicio_i.setDate(
          fecha_inicio_i.getDate() +
            ((dias[dia] - fecha_inicio_i.getDay() + 7) % 7)
        );
        for (
          fecha_inicio_i;
          fecha_inicio_i <= semana.dataValues.fin_semana;
          fecha_inicio_i.setDate(fecha_inicio_i.getDate() + 7)
        ) {
          console.log(fecha_inicio_i);
        }
      }
    }
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
        id_horario: horario.dataValues.id,
      },
    });
    if (servicios_creados.length < 0) {
      await horario.destroy();
      res
        .status(500)
        .send({ message: "No se creó ningún servicio revisa las fechas" });
      return;
    }
    res.status(200).send({ horario: horario });
  } else {
    if (fecha_inicio !== horario.dataValues.fecha_inicio) {
      var notificacion_fecha_inicio;
      await Servicios_dia.destroy({
        where: {
          id_horario: id,
          estado: "Pendiente",
          fecha: {
            [Op.lt]: fecha_inicio,
          },
        },
      });
      const servicios_confirmados_fecha_inicio = await Servicios_dia.findAll({
        where: {
          id_horario: id,
          estado: "Confirmado",
          fecha: {
            [Op.lt]: fecha_inicio,
          },
        },
      });
      servicios_confirmados_fecha_inicio.forEach(async (servicio) => {
        notificacion_fecha_inicio = await Notificaciones.create({
          id_servicio: servicio.dataValues.id,
          fecha_inicio: servicio.dataValues.fecha,
          num_alumnos: servicio.dataValues.num_servicios,
          hora_inicio: servicio.dataValues.hora_inicio,
          hora_fin: servicio.dataValues.hora_fin,
          salon: servicio.dataValues.salon_id,
          no_clase: servicio.dataValues.no_clase,
          programa: servicio.dataValues.programa,
          hora_servicio_inicio: servicio.dataValues.hora_servicio_inicio,
          hora_servicio_fin: servicio.dataValues.hora_servicio_fin,
          id_usuario: req.user.dataValues.id,
          tipo: "Cancelacion",
        });
        await send(
          "0246759@up.edu.mx",
          req.user.dataValues.nombre +
            " ha creado una solicitud de cancelacion",
          notificacion_fecha_inicio,
          req.user.dataValues.nombre
        );
      });
    }
    if (fecha_fin !== horario.dataValues.fecha_fin) {
      var notificacion_fecha_f;
      await Servicios_dia.destroy({
        where: {
          id_horario: id,
          estado: "Pendiente",
          fecha: {
            [Op.gt]: fecha_fin,
          },
        },
      });
      const servicios_confirmados_fecha_fin = await Servicios_dia.findAll({
        where: {
          id_horario: id,
          estado: "Confirmado",
          fecha: {
            [Op.gt]: fecha_fin,
          },
        },
      });
      servicios_confirmados_fecha_fin.forEach(async (servicio) => {
        notificacion_fecha_f = await Notificaciones.create({
          id_servicio: servicio.dataValues.id,
          fecha_inicio: servicio.dataValues.fecha,
          num_alumnos: servicio.dataValues.num_servicios,
          hora_inicio: servicio.dataValues.hora_inicio,
          hora_fin: servicio.dataValues.hora_fin,
          salon: servicio.dataValues.salon_id,
          no_clase: servicio.dataValues.no_clase,
          programa: servicio.dataValues.programa,
          hora_servicio_inicio: servicio.dataValues.hora_servicio_inicio,
          hora_servicio_fin: servicio.dataValues.hora_servicio_fin,
          id_usuario: req.user.dataValues.id,
          tipo: "Cancelacion",
        });
        await send(
          "0246759@up.edu.mx",
          req.user.dataValues.nombre +
            " ha creado una solicitud de cancelacion",
          notificacion_fecha_f,
          req.user.dataValues.nombre
        );
      });
    }
    if (num_alumnos !== horario.dataValues.num_alumnos) {
      var notificacion_num;
      await Servicios_dia.update({
        num_servicios: num_alumnos,
      });
      const servicios_confirmados_num_alumnos = await Servicios_dia.findAll({
        where: {
          id_horario: id,
          estado: "Confirmado",
        },
      });
      servicios_confirmados_num_alumnos.forEach(async (servicio) => {
        notificacion_num = await Notificaciones.create({
          id_servicio: servicio.dataValues.id,
          fecha_inicio: servicio.dataValues.fecha,
          num_alumnos: servicio.dataValues.num_servicios,
          hora_inicio: servicio.dataValues.hora_inicio,
          hora_fin: servicio.dataValues.hora_fin,
          salon: servicio.dataValues.salon_id,
          no_clase: servicio.dataValues.no_clase,
          programa: servicio.dataValues.programa,
          hora_servicio_inicio: servicio.dataValues.hora_servicio_inicio,
          hora_servicio_fin: servicio.dataValues.hora_servicio_fin,
          id_usuario: req.user.dataValues.id,
          tipo: "Cambio",
        });
      });
      await send(
        "0246759@up.edu.mx",
        req.user.dataValues.nombre + " ha creado una solicitud de cancelacion",
        notificacion_num,
        req.user.dataValues.nombre
      );
    }
    res.status(200).send({ horario: horario });
  }
};

module.exports = {
  get_horarios_todos,
  get_horario,
  delete_horario,
  create_horario,
  update_horario,
};
