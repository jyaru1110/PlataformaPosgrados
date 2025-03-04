const Horario = require("../models/Horario");
const Servicios_dia = require("../models/Servicios_dia");
const Semana = require("../models/Semana");
const Notificaciones = require("../models/Notificaciones");
const { Op } = require("sequelize");
const { send_notificacion } = require("../mail/nodemailerprovider");
const sequelize = require("../database/database");
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" }).single("file");
const fs = require("fs");
const { parse } = require("csv-parse");

const environment = process.env.ENV;

const dias_numero = {
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
};

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
    query = "select * from horario order by horario.fecha_inicio asc;";
  } else {
    query =
      "select * from horario inner join programa on programa.programa = horario.programa where programa.escuela = '" +
      req.user.dataValues.escuela +
      "' order by horario.fecha_inicio asc;";
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
    const servicios_cancelados = await Servicios_dia.destroy({
      where: {
        id_horario: id,
        estado: "Pendiente",
      },
    });
    const servicios_para_notificacion = await Servicios_dia.findAll({
      where: {
        id_horario: id,
        estado: "Confirmado",
        fecha: {
          [Op.gte]: new Date(),
        },
      },
    });
    if(servicios_para_notificacion.length==0)
    {
      return res.status(200).send({message:"No se encontraron servicios para cancelar"});
    }
    for (let i = 0; i < servicios_para_notificacion.length; i++) {
      const servicio = servicios_para_notificacion[i];
      const notificacion = await Notificaciones.create({
        id_servicio: servicio.dataValues.id,
        tipo: "Cancelacion",
        salon: servicio.salon_id,
        programaPrograma: servicio.programaPrograma,
        fecha_inicio: servicio.fecha,
        hora_inicio: servicio.hora_inicio,
        hora_fin: servicio.hora_fin,
        hora_servicio_inicio: servicio.hora_servicio_inicio,
        hora_servicio_fin: servicio.hora_servicio_fin,
        no_clase: servicio.no_clase,
        num_alumnos: servicio.num_servicios,
        id_usuario: req.user.dataValues.id,
        estado: "En proceso",
      });
      await send_notificacion(
        "mx_eventos@up.edu.mx",
        req.user.dataValues.nombre +
          " ha realizado una solicitud de cancelacion",
        notificacion.dataValues,
        req.user.dataValues.nombre
      );
      await send_notificacion(
        req.user.dataValues.email,
        "Has realizado una solicitud de cancelacion",
        notificacion.dataValues,
        req.user.dataValues.nombre
      );
    }
    res.status(200).send({message: "Se han cancelado los servicios"});
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
    programaPrograma,
    num_alumnos,
    hora_servicio_inicio,
    hora_servicio_fin,
  } = req.body;
  const solicitadoPor = req.user.dataValues.id;
  var fecha_inicio = req.body.fecha_inicio;
  const servicios_repetidos = await Servicios_dia.findAll({
    where: {
      salon_id: salon,
      dia: dia,
      fecha: {
        [Op.between]: [fecha_inicio, fecha_fin],
      },
      no_clase: no_clase,
      programaPrograma: programaPrograma,
      num_servicios: num_alumnos,
      hora_servicio_inicio: hora_servicio_inicio,
      hora_servicio_fin: hora_servicio_fin,
    },
  });
  if (servicios_repetidos.length > 0) {
    res.status(500).send({
      message: "Verfifica las fechas, hay servicios identicos ya registrados",
    });
    return;
  }

  const semana = await Semana.findOne({});
  //fin de la semana confirmada
  var fecha_fin_semana_date = new Date(semana.dataValues.fin_semana);
  var notificacion;
  if (fecha_inicio <= semana.dataValues.fin_semana && rol !== "Gestor") {
    //creo el iterador de los dias
    var fecha_inicio_i = new Date(fecha_inicio);
    //obtengo el dia de la semana de la fecha de inicio después de la fecha de inicio (si es el mismo día, no se suma nada)
    fecha_inicio_i.setDate(
      fecha_inicio_i.getDate() + ((dias[dia] - fecha_inicio_i.getDay() + 7) % 7)
    );
    //obtengo la fecha de inicio en formato iso
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
        no_clase: no_clase,
        programaPrograma: programaPrograma,
        num_alumnos: num_alumnos,
        hora_servicio_inicio: hora_servicio_inicio,
        hora_servicio_fin: hora_servicio_fin,
        id_usuario: req.user.dataValues.id,
        tipo: "Nuevo",
      });
      await send_notificacion(
        "mx_eventos@up.edu.mx",
        req.user.dataValues.nombre +
          " ha creado una solicitud de nuevo servicio",
        notificacion,
        req.user.dataValues.nombre
      );
      fecha_inicio_i.setDate(fecha_inicio_i.getDate() + 7);
      fecha_inicio = fecha_inicio_i.toISOString().slice(0, 10);
    }
    //calculo la suma al fin de la semana confirmada, si es 5, se suma 1, si no, se suma la diferencia entre el dia de la semana y el dia de la fecha de fin de semana
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
      programaPrograma: programaPrograma,
      hora_servicio_inicio: hora_servicio_inicio,
      hora_servicio_fin: hora_servicio_fin,
      num_servicios: num_alumnos,
      solicitadoPor: solicitadoPor,
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
      programa: programaPrograma,
      hora_servicio_inicio: hora_servicio_inicio,
      hora_servicio_fin: hora_servicio_fin,
      num_alumnos: num_alumnos,
      solicitadoPor: solicitadoPor,
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
        .send({ message: "No se creó ningún servicio, revisa las fechas" });
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
  const fecha_actual = new Date();
  const fecha_a_actualizar = fecha_inicio > fecha_actual ? fecha_inicio : fecha_actual;
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
      programaPrograma: programa,
      num_servicios: num_alumnos,
    },
    {
      where: {
        id_horario: id,
        fecha: {
          [Op.between]: [fecha_a_actualizar, fecha_fin],
        },
        estado: "Pendiente",
      },
    }
  );

  const servicios_para_notificacion = await Servicios_dia.findAll({
    where: {
      id_horario: id,
      fecha: {
        [Op.between]: [fecha_a_actualizar, fecha_fin],
      },
      estado: "Confirmado",
    },
  });
  for (let i = 0; i < servicios_para_notificacion.length; i++) {
    const servicio = servicios_para_notificacion[i];
    const notificacion = await Notificaciones.create({
      id_servicio: servicio.dataValues.id,
      tipo: "Cambio",
      salon: salon,
      programaPrograma: programa,
      fecha_inicio: fecha_inicio,
      hora_inicio: hora_inicio,
      hora_fin: hora_fin,
      hora_servicio_inicio: hora_servicio_inicio,
      hora_servicio_fin: hora_servicio_fin,
      no_clase: no_clase,
      num_alumnos: num_alumnos,
      id_usuario: req.user.dataValues.id,
      estado: "En proceso",
    });
    await send_notificacion(
      "mx_eventos@up.edu.mx",
      req.user.dataValues.nombre + " ha realizado una solicitud de cambio",
      notificacion.dataValues,
      req.user.dataValues.nombre
    );
    await send_notificacion(
      req.user.dataValues.email,
      "Has realizado una solicitud de cambio",
      notificacion.dataValues,
      req.user.dataValues.nombre
    );
  }

  res.status(200).send({ horario: nuevo_horario });
};

const bulk_create_horario = async (req, res) => {
  const cleanKey = key => key.replace(/^\ufeff/, '');
  upload(req, res, async (err) => {
    const file = req.file;
    const horarios = [];
    const semana = await Semana.findOne({});
    let hay_error = false;

    fs.createReadStream(file.path)
      .pipe(
        parse({
          delimiter: ",",
          relax_quotes: true,
          columns: true,
          ltrim: true,
        })
      )
      .on("data", function (row) {
        const cleanedRow = Object.fromEntries(
          Object.entries(row).map(([key, value]) => [cleanKey(key), value])
        );
        cleanedRow["solicitadoPor"] = req.user.dataValues.id;
        horarios.push(cleanedRow);
      })
      .on("error", function (error) {
        return res.status(500).send({ message: "Error al subir el archivo" });
      })
      .on("end", async () => {
        horarios.forEach((horario) => {
          horario.dia = dias_numero[horario.dia];
          if (horario.fecha_inicio > horario.fecha_fin) {
            hay_error = true;
          }
          if (horario.fecha_inicio <= semana.dataValues.fin_semana) {
            hay_error = true;
          }
        });
        if (hay_error) {
          return res.status(500).send({
            message:
              "No se pueden crear horarios antes de la semana confirmada: " +
              semana.dataValues.fin_semana +
              ", realiza tu solicitud",
          });
        }
        try {
          await Horario.bulkCreate(horarios);
          return res.status(200).send({});
        } catch (e) {
          console.log(e);
          return res.status(500).send({ message: e.parent.detail });
        }
      });
  });
};

module.exports = {
  get_horarios_todos,
  get_horario,
  delete_horario,
  create_horario,
  update_horario,
  bulk_create_horario,
};
