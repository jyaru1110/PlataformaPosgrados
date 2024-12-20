const Servicios_dia = require("../models/Servicios_dia");
const Notificaciones = require("../models/Notificaciones");
const Salon = require("../models/Salon");
const Programa = require("../models/Programa");
const Usuario = require("../models/Usuario");
const { Op, Sequelize } = require("sequelize");
const sequelize = require("../database/database");
const {
  send_notificacion,
  send_servicios_confirmados,
} = require("../mail/nodemailerprovider");
const Semana = require("../models/Semana");

const get_servicios_confirmados = async (req, res) => {
  const escuela = req.user.dataValues.escuela;
  const semana = await Semana.findOne({
    where: {
      id: 3,
    },
  });
  const query_aprobados =
    `select * from servicios_dia inner join programa on programa.programa = servicios_dia."programaPrograma" where servicios_dia.estado = 'Confirmado' and (servicios_dia.estado_coordinador = 'Aprobado' or servicios_dia.estado_coordinador ='En revisión') and servicios_dia."aprobadoPor" = '` +
    req.user.dataValues.id +
    "' and servicios_dia.fecha between '" +
    semana.inicio_semana +
    "' and '" +
    semana.fin_semana +
    "'";
  const servicios_aprobados = await sequelize.query(query_aprobados);
  const hayAprobados = servicios_aprobados[0].length > 0;
  const query =
    `select * from servicios_dia inner join programa on programa.programa = servicios_dia."programaPrograma" where servicios_dia.estado = 'Confirmado' and (servicios_dia.estado_coordinador = 'Sin revisión' or servicios_dia.estado_coordinador = 'En revisión') and programa.escuela = '` +
    escuela +
    "' and servicios_dia.fecha between '" +
    semana.inicio_semana +
    "' and '" +
    semana.fin_semana +
    "'";
  const servicios_confirmados = await sequelize.query(query);

  return res
    .status(200)
    .send({ servicios: servicios_confirmados[0], hayAprobados: hayAprobados });
};

const aprobar_servicios = async (req, res) => {
  const servicios = req.body.servicios;
  const servicios_en_revision = req.body.servicios_en_revision?.map(
    (servicio) => {
      servicio.id;
    }
  );
  if (servicios.length == 0 && servicios_en_revision.length == 0) {
    res.status(500).send({ error: "No se pudo confirmar el servicio" });
    return;
  }
  await Servicios_dia.update(
    {
      estado_coordinador: "Aprobado",
      aprobadoPor: req.user.dataValues.id,
    },
    {
      where: {
        id: {
          [Op.in]: servicios,
        },
        estado: "Confirmado",
      },
    }
  );
  await Servicios_dia.update(
    {
      estado_coordinador: "En revisión",
      aprobadoPor: req.user.dataValues.id,
    },
    {
      where: {
        id: {
          [Op.in]: servicios_en_revision,
        },
        estado: "Confirmado",
      },
    }
  );
  return res.status(200).send({ success: true });
};

const get_servicios_fecha = async (req, res) => {
  const rol = req.user.dataValues.rol;
  const fecha = req.params.fecha;
  var query = "";
  if (rol == "Gestor") {
    query = `select * from servicios_dia inner join programa on programa.programa = servicios_dia."programaPrograma" where fecha = '${fecha}' order by hora_inicio asc`;
  } else {
    query = `select * from servicios_dia inner join programa on programa.programa = servicios_dia."programaPrograma" where programa.escuela = '${req.user.dataValues.escuela}' and fecha = '${fecha}' order by hora_inicio asc`;
  }
  try {
    const servicios = await sequelize.query(query);
    res.status(200).send({ servicio: servicios });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

const cancelar_servicios = async (req, res) => {
  const rol = req.user.dataValues.rol;
  const servicios = req.body.servicios;
  if (servicios.length == 0) {
    res.status(500).send({ error: "No se pudo confirmar el servicio" });
    return;
  }
  const servicios_dia = await Servicios_dia.destroy({
    where: {
      id: {
        [Op.in]: servicios,
      },
      estado: "Pendiente",
    },
  });
  const servicios_confirmados = await Servicios_dia.findAll({
    where: {
      id: {
        [Op.in]: servicios,
      },
      estado: "Confirmado",
    },
  });
  if (rol !== "Gestor") {
    for (let i = 0; i < servicios_confirmados.length; i++) {
      const servicio = servicios_confirmados[i];
      await Notificaciones.destroy({
        where: {
          id_servicio: servicio.dataValues.id,
          estado: "En proceso",
        },
      });
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
  } else {
    await Servicios_dia.destroy({
      where: {
        id: {
          [Op.in]: servicios,
        },
        estado: "Confirmado",
      },
    });
  }
  res.status(200).send({ servicios: servicios_dia });
};

const confirmar_servicios = async (req, res) => {
  const rol = req.user.dataValues.rol;
  const { fecha_inicio, fecha_fin } = req.body;
  if (rol != "Gestor") {
    res.status(500).send({ error: "No se pudo confirmar el servicio" });
    return;
  }
  const semana = await Semana.findOne();

  const servicios_confirmados = await Servicios_dia.update(
    {
      estado: "Confirmado",
    },
    {
      where: {
        fecha: {
          [Op.between]: [fecha_inicio, fecha_fin],
        },
        estado: {
          [Op.in]: ["Pendiente", "Confirmado"],
        },
      },
      returning: true,
    }
  );

  if (semana.dataValues.fin_semana < fecha_fin) {
    semana.inicio_semana = fecha_inicio;
    semana.fin_semana = fecha_fin;
    await semana.save();
  }

  const coordinadores = await Usuario.findAll({
    include: [
      {
        model: Programa,
        required: true,
      },
    ],
  });

  coordinadores.forEach(async (element) => {
    const programas = element.programas.map((programa) => {
      return programa.dataValues.programa;
    });
    const servicios = servicios_confirmados[1].filter((servicio) => {
      return programas.includes(servicio.programaPrograma);
    });
    await send_servicios_confirmados(
      element.dataValues.email,
      " del " + fecha_inicio + " al " + fecha_fin,
      servicios
    );
  });

  return res.status(200).send({ semana: semana });
};
const get_reporte = async (req, res) => {
  const rol = req.user.dataValues.rol;
  const { fecha_inicio, fecha_fin } = req.body;
  var query = "";
  if (rol == "Gestor") {
    query = `select salon.isla,servicios_dia.fecha,sum(servicios_dia.num_servicios) as NoPersonas,STRING_AGG(num_servicios::varchar || ' ' || salon::varchar, ' \n' ) as Observaciones, STRING_AGG(SUBSTRING(hora_servicio_inicio:: varchar ,0,6) || '-' || SUBSTRING(hora_servicio_fin:: varchar ,0,6),'\n') as horario, STRING_AGG(programa.cuenta,'\n') as cuenta from servicios_dia inner join salon on salon.salon = servicios_dia.salon_id inner join programa on programa.programa = servicios_dia."programaPrograma" WHERE servicios_dia.fecha between 
      '${fecha_inicio}' and '${fecha_fin}' and estado = 'Confirmado' group by servicios_dia.fecha,salon.isla order by servicios_dia.fecha asc`;
  } else {
    query = `select programa.cuenta as cuenta,STRING_AGG(fecha::varchar, ' \n' ) as fechas,STRING_AGG(num_servicios::varchar || ' servicios ' || salon::varchar || ' ' || SUBSTRING(hora_servicio_inicio:: varchar ,0,6) || '-' || SUBSTRING(hora_servicio_fin:: varchar ,0,6), '\n' ) as Observaciones, STRING_AGG(SUBSTRING(hora_servicio_inicio:: varchar ,0,6) || '-' || SUBSTRING(hora_servicio_fin:: varchar ,0,6),'\n') as horario,sum(servicios_dia.num_servicios) as servicios, '$' || sum(servicios_dia.num_servicios*85) || ' + IVA' as total from servicios_dia inner join salon on salon.salon = servicios_dia.salon_id inner join programa on programa.programa = servicios_dia.programaPrograma WHERE servicios_dia.fecha between 
      '${fecha_inicio}' and '${fecha_fin}' and programa.escuela = '${req.user.dataValues.escuela}' and estado = 'Confirmado' group by programa.cuenta;`;
  }

  const servicios_dia_isla = await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
  });

  res.status(200).send({ servicios: servicios_dia_isla });
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
    query = `select sum(servicios_dia.num_servicios) as servicios_totales,salon.isla,programa.codigo as programa from servicios_dia left join salon on servicios_dia.salon_id =  salon.salon inner join programa on programa.programa = servicios_dia."programaPrograma" where servicios_dia.fecha = '${fecha}' group by salon.isla,programa.codigo`;
  } else {
    query = `select sum(servicios_dia.num_servicios) as servicios_totales,salon.isla,servicios_dia.programa as programa from servicios_dia left join salon on servicios_dia.salon_id =  salon.salon inner join programa on programa.programa = servicios_dia."programaPrograma" where programa.escuela = '${req.user.dataValues.escuela}' and servicios_dia.fecha = '${fecha}' group by salon.isla,programa.codigo`;
  }
  try {
    const servicios_dia = await sequelize.query(query);
    res.status(200).send({ servicio: servicios_dia });
  } catch (error) {
    console.log(error);
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
    query = `select sum(servicios_dia.num_servicios) as servicios_totales,salon.isla from servicios_dia left join salon on servicios_dia.salon_id =  salon.salon inner join programa on programa.programa = servicios_dia."programaPrograma" where servicios_dia.fecha between 
      '${fecha_inicio}' and '${fecha_fin}' and programa.escuela = '${req.user.dataValues.escuela}' group by salon.isla`;
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
    query = `select * from servicios_dia inner join programa on programa.programa = servicios_dia."programaPrograma" inner join salon on salon.salon = servicios_dia.salon_id order by fecha asc,hora_inicio asc`;
  } else {
    query = `select * from servicios_dia inner join programa on programa.programa = servicios_dia."programaPrograma" inner join salon on salon.salon = servicios_dia.salon_id where programa.escuela ='${req.user.dataValues.escuela}' order by servicios_dia.fecha asc,servicios_dia.hora_inicio asc`;
  }
  const servicios = await sequelize.query(query);
  res.status(200).send({ servicio: servicios });
};

const get_servicios_pendientes = async (req, res) => {
  const fecha = req.params.fecha;
  const rol = req.user.dataValues.rol;
  var query = "";
  if (rol == "Gestor") {
    query = `select * from servicios_dia inner join programa on programa.programa = servicios_dia."programaPrograma" inner join salon on servicios_dia.salon_id = salon.salon where not estado = 'Cancelado' and fecha = '${fecha}' order by hora_inicio asc`;
  } else {
    query = `select * from servicios_dia inner join programa on programa.programa = servicios_dia."programaPrograma" inner join salon on servicios_dia.salon_id = salon.salon where programa.escuela ='${req.user.dataValues.escuela}' and not estado = 'Cancelado' and fecha = '${fecha}' order by servicios_dia.hora_inicio asc`;
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
    query = `select * from servicios_dia inner join programa on programa.programa = servicios_dia."programaPrograma" where fecha >= '${iso_today}' and not estado = 'Cancelado' order by fecha asc, hora_inicio asc limit 1`;
  } else {
    query = `select * from servicios_dia inner join programa on programa.programa =  servicios_dia."programaPrograma" where servicios_dia.fecha >= '${iso_today}' and not servicios_dia.estado = 'Cancelado' and programa.escuela='${req.user.dataValues.escuela}' order by fecha asc, hora_inicio asc limit 1`;
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
    programaPrograma,
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
      programaPrograma: programaPrograma,
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
  const salon_nuevo = await Salon.findOne({
    where: {
      salon: salon_id,
    },
  });
  const salon_viejo = await Salon.findOne({
    where: {
      salon: servicio.salon_id,
    },
  });
  if(fecha < new Date().toISOString().split("T")[0]){
    return res.status(500).send({ error: "No se puede modificar un servicio que ya pasó" });
  }

  if (
    rol == "Gestor" ||
    servicio.estado !== "Confirmado" ||
    (servicio.num_servicios == num_servicios &&
      servicio.fecha == fecha &&
      salon_nuevo.isla == salon_viejo.isla &&
      servicio.hora_servicio_inicio == hora_servicio_inicio &&
      servicio.hora_servicio_fin == hora_servicio_fin)
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
          programaPrograma: programa,
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
      await Notificaciones.destroy({
        where: {
          id_servicio: id,
          estado: "En proceso",
        },
      });
      const notificacion = await Notificaciones.create({
        id_servicio: id,
        tipo: "Cambio",
        salon: salon_id,
        salon_actual: servicio.salon_id,
        programaPrograma: programa,
        fecha_inicio: fecha,
        fecha_actual: servicio.fecha,
        hora_inicio: hora_inicio,
        hora_fin: hora_fin,
        hora_servicio_inicio: hora_servicio_inicio,
        hora_servicio_inicio_actual: servicio.hora_servicio_inicio,
        hora_servicio_fin: hora_servicio_fin,
        hora_servicio_fin_actual: servicio.hora_servicio_fin,
        no_clase: no_clase,
        num_alumnos: num_servicios,
        num_alumnos_actual: servicio.num_servicios,
        id_usuario: req.user.dataValues.id,
        estado: "En proceso",
      });

      await send_notificacion(
        "mx_eventos@up.edu.mx",
        req.user.dataValues.nombre +
          " ha creado una solicitud de cambio de servicio",
        notificacion.dataValues,
        req.user.dataValues.nombre
      );
      await send_notificacion(
        req.user.dataValues.email,
        "Has creado una solicitud de cambio de servicio",
        notificacion.dataValues,
        req.user.dataValues.nombre
      );
      res.status(200).send({ notificacion: notificacion });
    } catch (error) {
      res.status(500).send({ error: error });
    }
  }
};

const get_servicios_a_tiempo_destiempo = async (req, res) => {
  const { fecha_inicio, fecha_fin, escuelas } = req.query;
  if (!escuelas || escuelas.length == 0) {
    return res.status(500).send({ message: "Falta la escuela" });
  }

  const servicios = await Servicios_dia.findAll({
    attributes: [
      [sequelize.fn("SUM", sequelize.col("num_servicios")), "suma_servicios"],
    ],
    where: {
      estado: "Confirmado",
      fecha: {
        [Op.between]: [fecha_inicio, fecha_fin],
      },
    },
    group: ["servicios_dia.id"],
    include: [
      {
        model: Programa,
        attributes: [],
        required: true,
        where: {
          escuela: {
            [Op.in]: escuelas,
          },
        },
      },
    ],
  });

  const total_servicios = servicios.reduce((acc, servicio) => {
    return acc + parseInt(servicio.dataValues.suma_servicios);
  }, 0);

  const servicios_impuntuales = await Notificaciones.findAll({
    attributes: [
      [sequelize.fn("SUM", sequelize.col("num_alumnos")), "suma_servicios"],
    ],
    group: ["notificaciones.id"],
    where: {
      tipo: "Nuevo",
      fecha_inicio: {
        [Op.between]: [fecha_inicio, fecha_fin],
      },
      estado: "Aceptada",
    },
    include: [
      {
        model: Programa,
        attributes: [],
        required: true,
        where: {
          escuela: {
            [Op.in]: escuelas,
          },
        },
      },
    ],
  });

  const total_servicios_impuntuales = servicios_impuntuales.reduce(
    (acc, servicio) => {
      return acc + parseInt(servicio.dataValues.suma_servicios);
    },
    0
  );

  const data = {
    labels: ["A tiempo", "Destiempo"],
    datasets: [
      {
        label: "Numero de servicios",
        data: [
          total_servicios - total_servicios_impuntuales,
          total_servicios_impuntuales,
        ],
        backgroundColor: ["#227B76", "#C9B608"],
        hoverOffset: 4,
      },
    ],
  };
  res.status(200).send(data);
};

const get_servicios_cancelados = async (req, res) => {
  const { fecha_inicio, fecha_fin, escuelas } = req.query;

  if (!escuelas || escuelas.length == 0) {
    return res.status(500).send({ message: "Falta la escuela" });
  }

  const servicios_cancelados = await Servicios_dia.findAll({
    attributes: [
      [sequelize.fn("SUM", sequelize.col("num_servicios")), "suma_servicios"],
    ],
    where: {
      estado: "Cancelado",
      fecha: {
        [Op.between]: [fecha_inicio, fecha_fin],
      },
    },
    group: ["servicios_dia.id"],
    include: [
      {
        model: Programa,
        attributes: [],
        required: true,
        where: {
          escuela: {
            [Op.in]: escuelas,
          },
        },
      },
    ],
  });

  const servicio_confirmados = await Servicios_dia.findAll({
    attributes: [
      [sequelize.fn("SUM", sequelize.col("num_servicios")), "suma_servicios"],
    ],
    where: {
      estado: "Confirmado",
      fecha: {
        [Op.between]: [fecha_inicio, fecha_fin],
      },
    },
    group: ["servicios_dia.id"],
    include: [
      {
        model: Programa,
        attributes: [],
        required: true,
        where: {
          escuela: {
            [Op.in]: escuelas,
          },
        },
      },
    ],
  });

  const total_servicios_cancelados = servicios_cancelados.reduce(
    (acc, servicio) => {
      return acc + parseInt(servicio.dataValues.suma_servicios);
    },
    0
  );

  const total_servicios_confirmados = servicio_confirmados.reduce(
    (acc, servicio) => {
      return acc + parseInt(servicio.dataValues.suma_servicios);
    },
    0
  );
  const data = {
    labels: ["Cancelados", "Realizados"],
    datasets: [
      {
        borderWith: 0,
        borderColor: "transparent",
        label: "Numero de servicios",
        data: [total_servicios_cancelados, total_servicios_confirmados],
        backgroundColor: ["#86172C", "#227B76"],
      },
    ],
  };

  res.status(200).send(data);
};

const get_programas_destiempo = async (req, res) => {
  const { fecha_inicio, fecha_fin } = req.query;
  const query = `select programa.escuela, sum(num_alumnos) as suma_servicios from notificaciones inner join programa on programa.programa = notificaciones."programaPrograma" where notificaciones.tipo = 'Nuevo' and notificaciones.fecha_inicio between '${fecha_inicio}' and '${fecha_fin}' and estado = 'Aceptada' group by programa.escuela`;
  const programas_servicios = await sequelize.query(query);

  const labels = programas_servicios[0].map((programa) => {
    return programa.escuela;
  });

  const datasets = programas_servicios[0].map((programa) => {
    return programa.suma_servicios;
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Numero de servicios",
        data: datasets,
        hoverOffset: 4,
        backgroundColor: [
          "#30675E",
          "#0F2C6E",
          "#C2A670",
          "#32547D",
          "#36A192",
          "#DE2B43",
        ],
      },
    ],
  };

  res.status(200).send(data);
};

const get_servicios_aprobados = async (req, res) => {
  const { fecha_inicio, fecha_fin, escuelas } = req.query;

  if (!escuelas || escuelas.length == 0) {
    return res.status(500).send({ message: "Falta la escuela" });
  }

  const servicios_confirmados = await Servicios_dia.findAll({
    attributes: [
      [sequelize.fn("SUM", sequelize.col("num_servicios")), "suma_servicios"],
    ],
    where: {
      estado: "Confirmado",
      fecha: {
        [Op.between]: [fecha_inicio, fecha_fin],
      },
    },
    group: ["servicios_dia.id"],
    include: [
      {
        model: Programa,
        attributes: [],
        required: true,
        where: {
          escuela: {
            [Op.in]: escuelas,
          },
        },
      },
    ],
  });

  const servicios_aprobados = await Servicios_dia.findAll({
    attributes: [
      [sequelize.fn("SUM", sequelize.col("num_servicios")), "suma_servicios"],
    ],
    where: {
      estado_coordinador: "Aprobado",
      fecha: {
        [Op.between]: [fecha_inicio, fecha_fin],
      },
    },
    group: ["servicios_dia.id"],
    include: [
      {
        model: Programa,
        attributes: [],
        required: true,
        where: {
          escuela: {
            [Op.in]: escuelas,
          },
        },
      },
    ],
  });

  const total_servicios_confirmados = servicios_confirmados.reduce(
    (acc, servicio) => {
      return acc + parseInt(servicio.dataValues.suma_servicios);
    },
    0
  );

  const total_servicios_aprobados = servicios_aprobados.reduce(
    (acc, servicio) => {
      return acc + parseInt(servicio.dataValues.suma_servicios);
    },
    0
  );

  const data = {
    labels: ["Sin aprobar", "Aprobados por el coordinador"],
    datasets: [
      {
        label: "Numero de servicios",
        data: [
          total_servicios_confirmados - total_servicios_aprobados,
          total_servicios_aprobados,
        ],
        backgroundColor: ["#C9B608", "#227B76"],
        hoverOffset: 4,
      },
    ],
  };

  res.status(200).send(data);
};

const delete_servicio = async (req, res) => {
  const id = req.params.id;
  const rol = req.user.dataValues.rol;
  const servicio = await Servicios_dia.findOne({
    where: {
      id: id,
    },
  });
  if (servicio.estado !== "Confirmado") {
    const servicio = await Servicios_dia.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).send({ servicio: servicio });
  } else if (rol == "Gestor") {
    servicio.estado = "Cancelado";
    await servicio.save();
    res.status(200).send({ servicio: servicio });
  } else {
    await Notificaciones.destroy({
      where: {
        id_servicio: id,
        estado: "En proceso",
      },
    });
    const notificacion = await Notificaciones.create({
      id_servicio: id,
      tipo: "Cancelacion",
      salon: servicio.salon_id,
      programaPrograma: servicio.programaPrograma,
      fecha_inicio: servicio.fecha,
      fecha_fin: servicio.fecha,
      hora_inicio: servicio.hora_inicio,
      hora_fin: servicio.hora_fin,
      hora_servicio_inicio: servicio.hora_servicio_inicio,
      hora_servicio_fin: servicio.hora_servicio_fin,
      num_alumnos: servicio.num_servicios,
      no_clase: servicio.no_clase,
      id_usuario: req.user.dataValues.id,
    });
    await send_notificacion(
      "mx_eventos@up.edu.mx",
      req.user.dataValues.nombre + " ha creado una solicitud de cancelación",
      notificacion,
      req.user.dataValues.nombre
    );
    await send_notificacion(
      req.user.dataValues.email,
      "Has creado una solicitud de cancelación",
      notificacion,
      req.user.dataValues.nombre
    );
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
  cancelar_servicios,
  confirmar_servicios,
  get_reporte,
  get_servicios_confirmados,
  aprobar_servicios,
  get_servicios_a_tiempo_destiempo,
  get_programas_destiempo,
  get_servicios_cancelados,
  get_servicios_aprobados,
};
