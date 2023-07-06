const Servicios_dia = require("../models/Servicios_dia");
const Notificaciones = require("../models/Notificaciones");
const { Op } = require("sequelize");
const sequelize = require("../database/database");
const send = require("../mail/nodemailerprovider");

const get_servicios_fecha = async (req, res) => {
  const rol = req.user.dataValues.rol;
  const fecha = req.params.fecha;
  var query = "";
  if (rol == "Gestor") {
    query =
      "select * from servicios_dia where fecha = '" +
      fecha +
      "' order by hora_inicio asc;";
  } else {
    query =
      "select * from servicios_dia inner join programa on programa.programa = servicios_dia.programa where programa.escuela = '" +
      req.user.dataValues.escuela +
      "' and fecha = '" +
      fecha +
      "' order by hora_inicio asc;";
  }
  try {
    const servicios = await sequelize.query(query);
    res.status(200).send({ servicio: servicios });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

const get_servicio = async (req, res) => {
  const id = req.params.id;
  try {
    const servicio = await Servicios_dia.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).send({ servicio: servicio });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

const get_servicios_isla = async (req, res) => {
  const rol = req.user.dataValues.rol;
  const fecha = req.params.dia;
  var query = "";
  if (rol == "Gestor") {
    query =
      "select sum(servicios_dia.num_servicios) as servicios_totales,salon.isla from servicios_dia left join salon on servicios_dia.salon_id =  salon.salon where servicios_dia.fecha = '" +
      fecha +
      "' group by salon.isla";
  } else {
    query =
      "select sum(servicios_dia.num_servicios) as servicios_totales,salon.isla from servicios_dia left join salon on servicios_dia.salon_id =  salon.salon inner join programa on programa.programa = servicios_dia.programa where programa.escuela = '" +
      req.user.dataValues.escuela +
      "' and servicios_dia.fecha = '" +
      fecha +
      "' group by salon.isla";
  }
  try {
    const servicios_dia = await sequelize.query(query);
    res.status(200).send({ servicio: servicios_dia });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

const get_suma_servicios_dia_isla = async (req, res) => {
  const fecha_inicio = req.params.fecha_inicio;
  const fecha_fin = req.params.fecha_fin;
  const rol = req.user.dataValues.rol;
  var query = "";
  if (rol == "Gestor") {
    query =
      "select sum(servicios_dia.num_servicios) as servicios_totales,salon.isla from servicios_dia left join salon on servicios_dia.salon_id =  salon.salon where servicios_dia.fecha between '" +
      fecha_inicio +
      "' and '" +
      fecha_fin +
      "' group by salon.isla";
  } else {
    query =
      "select sum(servicios_dia.num_servicios) as servicios_totales,salon.isla from servicios_dia left join salon on servicios_dia.salon_id =  salon.salon inner join programa on programa.programa = servicios_dia.programa where servicios_dia.fecha between '" +
      fecha_inicio +
      "' and '" +
      fecha_fin +
      "' and programa.escuela = '" +
      req.user.dataValues.escuela +
      "' group by salon.isla";
  }
  try {
    const servicios_dia = await sequelize.query(query);
    res.status(200).send({ servicio: servicios_dia });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

const get_servicios_todos = async (req, res) => {
  const rol = req.user.dataValues.rol;
  var query = "";
  if (rol == "Gestor") {
    query = "select * from servicios_dia order by fecha asc,hora_inicio asc";
  } else {
    query =
      "select * from servicios_dia inner join programa on programa.programa = servicios_dia.programa where programa.escuela ='" +
      req.user.dataValues.escuela +
      "'order by servicios_dia.fecha asc,servicios_dia.hora_inicio asc";
  }
  const servicios = await sequelize.query(query);
  res.status(200).send({ servicio: servicios });
};

const get_servicios_pendientes = async (req, res) => {
  const fecha = req.params.fecha;
  const rol = req.user.dataValues.rol;
  var query = "";
  if (rol == "Gestor") {
    query =
      "select * from servicios_dia where estado = 'Confirmado' and fecha = '" +
      fecha +
      "' order by hora_inicio asc";
  } else {
    query =
      "select * from servicios_dia inner join programa on programa.programa = servicios_dia.programa where programa.escuela ='" +
      req.user.dataValues.escuela +
      "' and estado = 'Confirmado' and fecha = '" +
      fecha +
      "' order by servicios_dia.hora_inicio asc";
  }
  const servicios = await sequelize.query(query);
  res.status(200).send({ servicio: servicios });
};

const get_proximo_servicio = async (req, res) => {
  const today = new Date();
  const rol = req.user.dataValues.rol;
  const iso_today = today.toISOString().split("T")[0];
  var query = "";
  if (rol == "Gestor") {
    query =
      "select * from servicios_dia where fecha >= '" +
      iso_today +
      "' and estado = 'Confirmado' order by fecha asc, hora_inicio asc limit 1";
  } else {
    query =
      "select * from servicios_dia inner join programa on programa.programa =  servicios_dia.programa where servicios_dia.fecha >= '" +
      iso_today +
      "' and servicios_dia.estado = 'Confirmado' and programa.escuela='" +
      req.user.dataValues.escuela +
      "' order by fecha asc, hora_inicio asc limit 1";
  }

  try {
    const servicio = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    res.json(servicio);
  } catch (error) {
    res.status(500).send({ error: error });
    console.log(error);
  }
};

const create_servicio = async (req, res) => {
  const {
    fecha,
    hora_inicio,
    hora_fin,
    num_servicios,
    salon_id,
    programa,
    no_clase,
    dia,
  } = req.body;
  try {
    const servicio = await Servicios_dia.create({
      fecha: fecha,
      hora_inicio: hora_inicio,
      hora_fin: hora_fin,
      num_servicios: num_servicios,
      salon_id: salon_id,
      programa: programa,
      no_clase: no_clase,
      dia: dia,
    });
    res.status(200).send({ servicio: servicio });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

const update_servicio = async (req, res) => {
  const {
    fecha,
    hora_inicio,
    hora_servicio_fin,
    hora_servicio_inicio,
    hora_fin,
    num_servicios,
    salon_id,
    programa,
    no_clase,
    estado,
  } = req.body;
  const id = req.params.id;
  const rol = req.user.dataValues.rol;
  const servicio = await Servicios_dia.findOne({
    where: {
      id: id,
    },
  });

  if (
    rol == "Gestor" ||
    servicio.estado !== "Confirmado" ||
    (servicio.num_alumnos == num_servicios && servicio.fecha == fecha)
  ) {
    try {
      const servicio = await Servicios_dia.update(
        {
          fecha: fecha,
          hora_inicio: hora_inicio,
          hora_fin: hora_fin,
          hora_servicio_inicio: hora_servicio_inicio,
          hora_servicio_fin: hora_servicio_fin,
          num_servicios: num_servicios,
          salon_id: salon_id,
          programa: programa,
          no_clase: no_clase,
          estado: estado,
        },
        {
          where: {
            id: id,
          },
        }
      );
      res.status(200).send({ servicio: servicio });
    } catch (error) {
      res.status(500).send({ error: error });
    }
  } else {
    try {
      const notificacion = await Notificaciones.create({
        id_servicio: id,
        tipo: "Cambio",
        salon: salon_id,
        programa: programa,
        fecha_inicio: fecha,
        fecha_fin: fecha,
        hora_inicio: hora_inicio,
        hora_fin: hora_fin,
        hora_servicio_inicio: hora_servicio_inicio,
        hora_servicio_fin: hora_servicio_fin,
        num_servicios: num_servicios,
        no_clase: no_clase,
        num_alumnos: num_servicios,
        id_usuario: req.user.dataValues.id,
        estado: "Pendiente",
      });
      res.status(200).send({ notificacion: notificacion });
      await send(
        "0246759@up.edu.mx",
        req.user.dataValues.nombre + " ha creado una solicitud de servicio",
        "Se ha creado una solicitud de servicio, revisala en ",
        notificacion.id
      );
    } catch (error) {
      res.status(500).send({ error: error });
    }
  }
};

const delete_servicio = async (req, res) => {
  const id = req.params.id;
  const rol = req.user.dataValues.rol;
  const servicio = Servicios_dia.findOne({
    where: {
      id: id,
    },
  });
  if (rol == "Gestor" || servicio.estado !== "Confirmado") {
    try {
      const servicio = await Servicios_dia.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).send({ servicio: servicio });
    } catch (error) {
      res.status(500).send({ error: error });
    }
  } else {
    const notificacion = await Notificaciones.create({
      id_servicio: id,
      tipo: "Cancelacion",
      salon: servicio.salon_id,
      programa: servicio.programa,
      fecha_inicio: servicio.fecha,
      fecha_fin: servicio.fecha,
      hora_inicio: servicio.hora_inicio,
      hora_fin: servicio.hora_fin,
      hora_servicio_inicio: servicio.hora_servicio_inicio,
      hora_servicio_fin: servicio.hora_servicio_fin,
      num_servicios: servicio.num_servicios,
      no_clase: servicio.no_clase,
      num_alumnos: servicio.num_alumnos,
      id_usuario: req.user.dataValues.id
    });
    res.status(200).send({ notificacion: notificacion });
  }
};

module.exports = {
  get_servicios_fecha,
  get_proximo_servicio,
  get_servicios_todos,
  get_servicios_pendientes,
  get_servicios_isla,
  get_suma_servicios_dia_isla,
  create_servicio,
  update_servicio,
  delete_servicio,
  get_servicio,
};
