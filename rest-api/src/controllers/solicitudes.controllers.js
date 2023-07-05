const Notificaciones = require("../models/Notificaciones");
const Horario = require("../models/Horario");
const Usuario = require("../models/Usuario");
const { Op } = require("sequelize");
const sequelize = require("../database/database");
const send = require("../mail/nodemailerprovider");

const get_solicitudes = async (req, res) => {
  const rol = req.user.dataValues.rol;
  var query = "";
  if (rol == "Gestor") {
    query =
      'select usuarios.nombre,notificaciones."createdAt",notificaciones.programa, notificaciones.no_clase, notificaciones.salon, notificaciones.id, notificaciones.fecha_inicio, notificaciones.fecha_fin, notificaciones.hora_inicio, notificaciones.hora_fin, notificaciones.hora_servicio_inicio,notificaciones.hora_servicio_fin, notificaciones.dia, notificaciones.num_alumnos, notificaciones.estado, notificaciones.tipo, notificaciones.id_servicio, servicios_dia.num_servicios as h_num_alumnos, servicios_dia.salon_id as h_salon, servicios_dia.programa as h_programa, servicios_dia.fecha as h_fecha_inicio, servicios_dia.hora_inicio as h_hora_inicio, servicios_dia.hora_fin as h_hora_fin, servicios_dia.hora_servicio_inicio as h_hora_s_inicio, servicios_dia.hora_servicio_fin as h_hora_s_fin, servicios_dia.no_clase as h_no_clase from notificaciones inner join usuarios on usuarios.id = notificaciones.id_usuario left join servicios_dia on servicios_dia.id =  notificaciones.id_servicio order by notificaciones.fecha_inicio;';
  } else {
    query =
      'select usuarios.nombre,notificaciones."createdAt",notificaciones.programa, notificaciones.no_clase, notificaciones.salon, notificaciones.id, notificaciones.fecha_inicio, notificaciones.fecha_fin, notificaciones.hora_inicio, notificaciones.hora_fin, notificaciones.hora_servicio_inicio,notificaciones.hora_servicio_fin, notificaciones.dia, notificaciones.num_alumnos, notificaciones.estado, notificaciones.tipo, notificaciones.id_servicio, servicios_dia.num_servicios as h_num_alumnos, servicios_dia.salon_id as h_salon, servicios_dia.programa as h_programa, servicios_dia.fecha as h_fecha_inicio, servicios_dia.hora_inicio as h_hora_inicio, servicios_dia.hora_fin as h_hora_fin, servicios_dia.hora_servicio_inicio as h_hora_s_inicio, servicios_dia.hora_servicio_fin as h_hora_s_fin, servicios_dia.no_clase as h_no_clase from notificaciones inner join usuarios on usuarios.id = notificaciones.id_usuario left join servicios_dia on servicios_dia.id =  notificaciones.id_servicio where notificaciones.id_usuario = ' +
      req.user.dataValues.id +
      ' order by notificaciones.fecha_inicio;';
  }
  const notificaciones = await sequelize.query(query);
  res.status(200).send({ notificaciones: notificaciones[0] });
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
        send(usuario.email, "Solicitud aceptada", "Solicitud aceptada");
        res.status(200).send({ message: "Solicitud aceptada" });
      } else {
        res.status(404).send({ message: "No se pudo crear el horario" });
      }
    } else if (notificacion.tipo == "Cambio") {
      const horario = await Horario.findOne({
        where: { id_horario: notificacion.id_horario },
      });
      if (horario) {
        horario.salon = notificacion.salon;
        horario.programa = notificacion.programa;
        horario.fecha_inicio = notificacion.fecha_inicio;
        horario.fecha_fin = notificacion.fecha_fin;
        horario.hora_inicio = notificacion.hora_inicio;
        horario.hora_fin = notificacion.hora_fin;
        horario.hora_servicio_inicio = notificacion.hora_servicio_inicio;
        horario.hora_servicio_fin = notificacion.hora_servicio_fin;
        horario.no_clase = notificacion.no_clase;
        horario.dia = notificacion.dia;
        horario.num_alumnos = notificacion.num_alumnos;
        await horario.save();
        notificacion.estado = "Aceptado";
        await notificacion.save();

        const usuario = await Usuario.findOne({
          where: { id: notificacion.id_usuario },
        });
        send(usuario.email, "Solicitud aceptada", "Solicitud aceptada");
        res.status(200).send({ message: "Solicitud aceptada" });
      } else {
        res.status(404).send({ message: "No se encontro el horario" });
      }
    } else if (notificacion.tipo == "Cancelacion") {
      const horario = await Horario.findOne({
        where: { id_horario: notificacion.id_horario },
      });
      if (horario) {
        await horario.destroy();
        notificacion.estado = "Aceptado";
        await notificacion.save();
        const notificaciones = await Notificaciones.destroy({
          where: { id_horario: notificacion.id_horario, tipo: "Cambio" },
        });
        const usuario = await Usuario.findOne({
          where: { id: notificacion.id_usuario },
        });
        send(usuario.email, "Solicitud aceptada", "Solicitud aceptada");
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
    send(usuario.email, "Solicitud rechazada", "Solicitud rechazada");
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
