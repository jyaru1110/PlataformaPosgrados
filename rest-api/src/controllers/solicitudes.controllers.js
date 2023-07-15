const Notificaciones = require("../models/Notificaciones");
const Servicios_dia = require("../models/Servicios_dia");
const Usuario = require("../models/Usuario");
const Horario = require("../models/Horario");
const { Op } = require("sequelize");
const sequelize = require("../database/database");
const send = require("../mail/nodemailerprovider");

const get_solicitudes = async (req, res) => {
  const rol = req.user.dataValues.rol;
  const where = rol=="Gestor"?{}:{id_usuario: req.user.dataValues.id};
  const notificaciones = await Notificaciones.findAll({
    where: where,
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Usuario,
      }
    ],
  });
  res.status(200).send({ notificaciones: notificaciones });
};

const aceptar_solicitud = async (req, res) => {
  const id = req.params.id;
  const notificacion = await Notificaciones.findOne({ where: { id: id } });
  if (notificacion) {
    if (notificacion.tipo == "Nuevo") {
      const nuevoHorario = Horario.create({
        salon: notificacion.salon,
        programa: notificacion.programa,
        fecha_inicio: notificacion.fecha_inicio,
        fecha_fin: notificacion.fecha_fin,
        hora_inicio: notificacion.hora_inicio,
        hora_fin: notificacion.hora_fin,
        hora_servicio_inicio: notificacion.hora_servicio_inicio,
        hora_servicio_fin: notificacion.hora_servicio_fin,
        no_clase: notificacion.no_clase,
        dia: notificacion.dia,
        num_alumnos: notificacion.num_alumnos,
      });
      notificacion.id_horario = nuevoHorario.id;
      await notificacion.save();
      if (nuevoHorario) {
        notificacion.estado = "Aceptado";
        await notificacion.save();
        const usuario = await Usuario.findOne({
          where: { id: notificacion.id_usuario },
        });
        send(
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
        await servicio.save();
        notificacion.estado = "Aceptado";
        await notificacion.save();

        const usuario = await Usuario.findOne({
          where: { id: notificacion.id_usuario },
        });
        send(
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
        await servicio.save();
        notificacion.estado = "Aceptado";
        await notificacion.save();
        const usuario = await Usuario.findOne({
          where: { id: notificacion.id_usuario },
        });
        send(
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
  const notificacion = await Notificaciones.findOne({ where: { id: id } });
  if (notificacion) {
    notificacion.estado = "Rechazado";
    await notificacion.save();
    const usuario = await Usuario.findOne({
      where: { id: notificacion.id_usuario },
    });
    send(
      usuario.email,
      "Solicitud rechazada",
      notificacion.dataValues,
      usuario.nombre
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

module.exports = {
  get_solicitudes,
  aceptar_solicitud,
  rechazar_solicitud,
  cancelar_solicitud,
};
