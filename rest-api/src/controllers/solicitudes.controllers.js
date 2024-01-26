const Notificaciones = require("../models/Notificaciones");
const Servicios_dia = require("../models/Servicios_dia");
const Usuario = require("../models/Usuario");
const Horario = require("../models/Horario");
const Programa = require("../models/Programa");
const { Op } = require("sequelize");
const sequelize = require("../database/database");
const {send_notificacion} = require("../mail/nodemailerprovider");


const get_solicitudes = async (req, res) => {
  const rol = req.user.dataValues.rol;
  const where = rol=="Gestor"?{}:{"escuela": req.user.dataValues.escuela};
  const notificaciones = await Notificaciones.findAll({
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Usuario,
      },
      {
        model: Programa,
        where: where,
        attributes:["programa"]
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
      const nuevoHorario = await Horario.create({
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
      notificacion.id_horario = nuevoHorario.id_horario;
      await notificacion.save();
      if (nuevoHorario) {
        notificacion.estado = "Aceptada";
        await notificacion.save();
        const usuario = await Usuario.findOne({
          where: { id: notificacion.id_usuario },
        });

        await Servicios_dia.update(
          {estado: "Confirmado"},
          {where: {id_horario: nuevoHorario.dataValues.id_horario, estado: "Pendiente"}}
        );
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
        servicio.estado_coordinador = "Aprobado"
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
          }
        });
        if(servicios_restantes.length==0){
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
  const notificacion = await Notificaciones.findOne({ where: { id: id }, include: [{model: Usuario}] });
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


module.exports = {
  get_solicitudes,
  aceptar_solicitud,
  rechazar_solicitud,
  cancelar_solicitud
};
