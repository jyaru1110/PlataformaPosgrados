const Notificaciones = require("../models/Notificaciones");
const Servicios_dia = require("../models/Servicios_dia");
const Usuario = require("../models/Usuario");
const Horario = require("../models/Horario");
const Programa = require("../models/Programa");
const { Op } = require("sequelize");
const { send_notificacion } = require("../mail/nodemailerprovider");

const get_solicitudes = async (req, res) => {
  const rol = req.user.dataValues.rol;
  const where = rol == "Gestor" ? {} : { escuela: req.user.dataValues.escuela };
  const notificaciones = await Notificaciones.findAll({
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Usuario,
      },
      {
        model: Programa,
        where: where,
        attributes: ["programa"],
      },
    ]
  });
  res.status(200).send({ notificaciones: notificaciones });
};

const aceptar_solicitud = async (req, res) => {
  const id = req.params.id;
  const notificacion = await Notificaciones.findOne({ where: { id: id } });
  if (notificacion) {
    if (notificacion.tipo == "Nuevo") {
      const nuevoHorario = await Servicios_dia.create({
        salon_id: notificacion.salon,
        programaPrograma: notificacion.programaPrograma,
        fecha: notificacion.fecha_inicio,
        hora_inicio: notificacion.hora_inicio,
        hora_fin: notificacion.hora_fin,
        hora_servicio_inicio: notificacion.hora_servicio_inicio,
        hora_servicio_fin: notificacion.hora_servicio_fin,
        no_clase: notificacion.no_clase,
        dia: notificacion.dia,
        num_servicios: notificacion.num_alumnos,
        estado: "Confirmado",
      });
      notificacion.id_servicio = nuevoHorario.id;
      await notificacion.save();
      if (nuevoHorario) {
        notificacion.estado = "Aceptada";
        await notificacion.save();
        const usuario = await Usuario.findOne({
          where: { id: notificacion.id_usuario },
        });

        await send_notificacion(
          usuario.email,
          "Solicitud aceptada",
          notificacion.dataValues,
          usuario.nombre
        );
        res.status(200).send({ message: "Solicitud aceptada" });
      } else {
        res.status(404).send({ message: "No se pudo crear el horario" });
      }
    } else if (notificacion.tipo == "Cambio") {
      const servicio = await Servicios_dia.findOne({
        where: { id: notificacion.id_servicio },
      });
      if (servicio) {
        servicio.fecha = notificacion.fecha_inicio;
        servicio.num_servicios = notificacion.num_alumnos;
        servicio.salon_id = notificacion.salon;
        servicio.estado = "Confirmado";
        servicio.aprobadoPor = notificacion.id_usuario;
        servicio.estado_coordinador = "Aprobado";
        servicio.programaPrograma = notificacion.programaPrograma;
        await servicio.save();
        notificacion.estado = "Aceptada";
        await notificacion.save();

        const usuario = await Usuario.findOne({
          where: { id: notificacion.id_usuario },
        });
        await send_notificacion(
          usuario.email,
          "Solicitud de cambio aceptada",
          notificacion.dataValues,
          usuario.nombre
        );
        res.status(200).send({ message: "Solicitud aceptada" });
      } else {
        res.status(404).send({ message: "No se encontro el horario" });
      }
    } else if (notificacion.tipo == "Cancelacion") {
      const servicio = await Servicios_dia.findOne({
        where: { id: notificacion.id_servicio },
      });
      if (servicio) {
        servicio.estado = "Cancelado";
        servicio.estado_coordinador = "Aprobado";
        await servicio.save();
        notificacion.estado = "Aceptada";
        await notificacion.save();
        const usuario = await Usuario.findOne({
          where: { id: notificacion.id_usuario },
        });
        const servicios_restantes = await Servicios_dia.findAll({
          where: {
            id_horario: servicio.id_horario,
          },
        });
        if (servicios_restantes.length == 0) {
          await Horario.destroy({
            where: { id_horario: servicio.id_horario },
          });
        }

        await send_notificacion(
          usuario.email,
          "Solicitud de cancelación aceptada",
          notificacion.dataValues,
          usuario.nombre
        );
        res.status(200).send({ message: "Solicitud aceptada" });
      } else {
        res.status(404).send({ message: "No se encontro el horario" });
      }
    }
  } else {
    res.status(404).send({ message: "No se encontro la solicitud" });
  }
};

const rechazar_solicitud = async (req, res) => {
  const id = req.params.id;
  const mensaje = req.body.mensaje;
  console.log(mensaje);
  const notificacion = await Notificaciones.findOne({
    where: { id: id },
    include: [{ model: Usuario }],
  });
  if (notificacion) {
    notificacion.estado = "Rechazada";
    notificacion.comentario = mensaje;
    await notificacion.save();
    await send_notificacion(
      notificacion.usuario.email,
      "Solicitud rechazada",
      notificacion.dataValues,
      notificacion.usuario.nombre
    );
    res.status(200).send({ message: "Solicitud rechazada" });
  } else {
    res.status(404).send({ message: "No se encontro la solicitud" });
  }
};

const cancelar_solicitud = async (req, res) => {
  const id = req.params.id;
  const notificacion = await Notificaciones.destroy({ where: { id: id } });
  if (notificacion) {
    res.status(200).send({ message: "Solicitud cancelada" });
  } else {
    res.status(404).send({ message: "No se encontro la solicitud" });
  }
};

const get_nivel_impuntualidad = async (req, res) => {
  const { fecha_inicio, fecha_fin, escuelas } = req.query;
  if (!escuelas || escuelas.length == 0) {
    return res.status(500).send({ message: "Falta la escuela" });
  }

  const solicitudes = await Notificaciones.findAll({
    attributes: [
      "num_alumnos",
      "tipo",
      "fecha_inicio",
      "hora_servicio_inicio",
      "createdAt",
      "id_servicio",
    ],
    where: {
      fecha_inicio: {
        [Op.between]: [fecha_inicio, fecha_fin],
      },
      estado: "Aceptada",
    },
    order: [["createdAt", "DESC"]],
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
  });

  const id_servicios_checked = [];

  const dataset_nuevos = {
    data: [0, 0, 0],
    label: "Nuevos",
    backgroundColor: "#227B76",
  };
  const dataset_cambios = {
    data: [0, 0, 0],
    label: "Cambios",
    backgroundColor: "#C9B608",
  };
  const dataset_cancelaciones = {
    data: [0, 0, 0],
    label: "Cancelaciones",
    backgroundColor: "#86172C",
  };

  solicitudes.forEach((solicitud) => {
    if (id_servicios_checked.includes(solicitud.dataValues.id_servicio)) {
      return;
    }

    const fecha_servicio_date = new Date(
      solicitud.dataValues.fecha_inicio +
        "T" +
        solicitud.dataValues.hora_servicio_inicio
    );

    const dias_retraso = (fecha_servicio_date - solicitud.dataValues.createdAt)/1000/60/60/24;

    if (solicitud.dataValues.tipo == "Nuevo") {
      if (dias_retraso > 2) {
        dataset_nuevos.data[2] += solicitud.dataValues.num_alumnos;
      } else if (dias_retraso > 1) {
        dataset_nuevos.data[1] += solicitud.dataValues.num_alumnos;
      } else {
        dataset_nuevos.data[0] += solicitud.dataValues.num_alumnos;
      }
    } else if (solicitud.dataValues.tipo == "Cambio") {
      id_servicios_checked.push(solicitud.dataValues.id_servicio);
      if (dias_retraso > 2) {
        dataset_cambios.data[2] += solicitud.dataValues.num_alumnos;
      } else if (dias_retraso > 1) {
        dataset_cambios.data[1] += solicitud.dataValues.num_alumnos;
      } else {
        dataset_cambios.data[0] += solicitud.dataValues.num_alumnos;
      }
    } else if (solicitud.dataValues.tipo == "Cancelacion") {
      id_servicios_checked.push(solicitud.dataValues.id_servicio);
      if (dias_retraso > 2) {
        dataset_cancelaciones.data[2] += solicitud.dataValues.num_alumnos;
      } else if (dias_retraso > 1) {
        dataset_cancelaciones.data[1] += solicitud.dataValues.num_alumnos;
      } else {
        dataset_cancelaciones.data[0] += solicitud.dataValues.num_alumnos;
      }
    }
  });

  const data = {
    labels: ["1 día", "1 a 2 días", "3 o más días"],
    datasets: [dataset_nuevos, dataset_cambios, dataset_cancelaciones],
  };

  return res.status(200).send(data);
};

module.exports = {
  get_solicitudes,
  aceptar_solicitud,
  rechazar_solicitud,
  cancelar_solicitud,
  get_nivel_impuntualidad,
};
