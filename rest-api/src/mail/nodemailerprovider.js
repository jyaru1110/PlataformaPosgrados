const user = process.env.EMAIL;
const pass = process.env.PASS;
const nodemailer = require("nodemailer");
const config = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: false,
  auth: {
    user: user,
    pass: pass,
  },
};

const send_notificacion = async (email, subject, notificacion, persona) => {
  const mensaje = notificacion.comentario
    ? "Motivo de rechazo: " + notificacion.comentario
    : "";
  try {
    const transporter = nodemailer.createTransport(config);
    const html =
      "<div><h7>" +
      mensaje +
      '</h7><table style="table-layout: auto;font-family: Poppins; border-collapse: collapse;"><thead style="background-color: #EFF3F8;"><tr style="text-align: left;border-top: 1px solid;border-bottom: 1px solid; border-color: #E1E3E8;"><th style="border-right: 1px solid; border-color: #E1E3E8; padding:8px">Fecha de solicitud</th><th style="border-right: 1px solid; border-color: #E1E3E8; padding:8px">Status</th><th style="border-right: 1px solid; border-color: #E1E3E8; padding:8px">Tipo</th><th style="border-right: 1px solid; border-color: #E1E3E8; padding:8px">Persona</th><th style="border-right: 1px solid; border-color: #E1E3E8; padding:8px">Salón</th><th style="border-right: 1px solid; border-color: #E1E3E8; padding:8px">Programa</th><th style="border-right: 1px solid; border-color: #E1E3E8; padding:8px">Fecha</th><th style="border-right: 1px solid; border-color: #E1E3E8; padding:8px">Hora incio</th><th style="border-right: 1px solid; border-color: #E1E3E8; padding:8px">Hora fin</th><th style="border-right: 1px solid; border-color: #E1E3E8; padding:8px">Hora incio servicio</th><th style="border-right: 1px solid; border-color: #E1E3E8; padding:8px">Hora fin servicio</th><th style="border-right: 1px solid; border-color: #E1E3E8; padding:8px">No. Clase</th><th style="border-left: 1px solid; border-color: #E1E3E8; padding:8px">Número servicios</th></tr></thead><tbody><tr><td style="border-right: 1px solid;border-bottom:1px solid;border-color: #E1E3E8; padding:8px;">' +
      notificacion.createdAt.toLocaleDateString() +
      '</td><td style="border-right: 1px solid;border-bottom:1px solid;border-color: #E1E3E8; padding:8px;">' +
      notificacion.estado +
      '</td><td style="border-right: 1px solid;border-bottom:1px solid;border-color: #E1E3E8; padding:8px;">' +
      notificacion.tipo +
      '</td><td style="border-right: 1px solid;border-bottom:1px solid;border-color: #E1E3E8; padding:8px;">' +
      persona +
      '</td><td style="border-right: 1px solid;border-bottom:1px solid;border-color: #E1E3E8; padding:8px;">' +
      notificacion.salon +
      '</td><td style="border-right: 1px solid;border-bottom:1px solid;border-color: #E1E3E8; padding:8px;">' +
      notificacion.programaPrograma +
      '</td><td style="border-right: 1px solid;border-bottom:1px solid;border-color: #E1E3E8; padding:8px;">' +
      notificacion.fecha_inicio +
      '</td><td style="border-right: 1px solid;border-bottom:1px solid;border-color: #E1E3E8; padding:8px;">' +
      notificacion.hora_inicio.substring(0, 5) +
      '</td><td style="border-right: 1px solid;border-bottom:1px solid;border-color: #E1E3E8; padding:8px;">' +
      notificacion.hora_fin.substring(0, 5) +
      '</td><td style="border-right: 1px solid;border-bottom:1px solid;border-color: #E1E3E8; padding:8px;">' +
      notificacion.hora_servicio_inicio.substring(0, 5) +
      '</td><td style="border-right: 1px solid;border-bottom:1px solid;border-color: #E1E3E8; padding:8px;">' +
      notificacion.hora_servicio_fin.substring(0, 5) +
      '</td><td style="border-right: 1px solid;border-bottom:1px solid;border-color: #E1E3E8; padding:8px;">' +
      notificacion.no_clase +
      '</td><td style="border-left: 1px solid; border-bottom:1px solid;border-color: #E1E3E8; padding:8px">' +
      notificacion.num_alumnos +
      '</td></tr></tbody></table><a href="https://posgradospanamericana.up.edu.mx/solicitudes">Revisa las solicitudes aquí</a></div>';

    const mailOptions = {
      from: '"Coffee breaks" <mx_eventos@up.edu.mx>',
      to: email,
      subject: subject,
      html: html,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
  } catch (error) {
    console.log(error);
  }
};

const send_servicios_confirmados = async (email, semana, servicios) => {
  const html =
    "<div><h7>Coffees confirmados para la semana " +
      semana +
      ". <b>En caso de no corroborar o corregir los servicios confirmados con el proveedor, se dará por hecho que son son correctos y se cobrará de manera correspondiente.</b></h7>" +
     ( servicios?.length >
    0
      ? ('<table style="table-layout: auto;font-family: Poppins; border-collapse: collapse;"><thead style="background-color: #EFF3F8;"><tr style="text-align: left;border-top: 1px solid;border-bottom: 1px solid; border-color: #E1E3E8;"><th style="border-right: 1px solid; border-color: #E1E3E8; padding:8px">Fecha</th><th style="border-right: 1px solid; border-color: #E1E3E8; padding:8px">Clase</th><th style="border-right: 1px solid; border-color: #E1E3E8; padding:8px">Hora inicio servicio</th><th style="border-right: 1px solid; border-color: #E1E3E8; padding:8px">Hora fin servicio</th><th style="border-right: 1px solid; border-color: #E1E3E8; padding:8px">Salón</th><th style="border-right: 1px solid; border-color: #E1E3E8; padding:8px">Programa</th><th style="border-right: 1px solid; border-color: #E1E3E8; padding:8px">Num. Servicios</th></tr></thead>' +
        "<tbody>" +
        servicios.map((servicio) => {
          return (
            '<tr><td style="border-right: 1px solid;border-bottom:1px solid;border-color: #E1E3E8; padding:8px;">' +
            servicio.dataValues.fecha +
            '</td><td style="border-right: 1px solid;border-bottom:1px solid;border-color: #E1E3E8; padding:8px;">' +
            servicio.dataValues.no_clase +
            '</td><td style="border-right: 1px solid;border-bottom:1px solid;border-color: #E1E3E8; padding:8px;">' +
            servicio.dataValues.hora_servicio_inicio.substring(0, 5) +
            '</td><td style="border-right: 1px solid;border-bottom:1px solid;border-color: #E1E3E8; padding:8px;">' +
            servicio.dataValues.hora_servicio_fin.substring(0, 5) +
            '</td><td style="border-right: 1px solid;border-bottom:1px solid;border-color: #E1E3E8; padding:8px;">' +
            servicio.dataValues.salon_id +
            '</td><td style="border-right: 1px solid;border-bottom:1px solid;border-color: #E1E3E8; padding:8px;">' +
            servicio.dataValues.programa +
            '</td><td style="border-right: 1px solid;border-bottom:1px solid;border-color: #E1E3E8; padding:8px;">' +
            servicio.dataValues.num_servicios +
            "</td></tr>"
          );
        }) +
        "</tbody>" +
        '</table><a href="https://posgradospanamericana.up.edu.mx/confirmados">Corrobora los servicios confirmados aquí</a>')
      : '<br><br><h7>No hay servicios confirmados para esta semana, en caso de que los necesites te pedimos que los solicites <a href="https://posgradospanamericana.up.edu.mx/add-servicio">aquí</a></h7>')
      + "</div>";
  try {
    const transporter = nodemailer.createTransport(config);
    const mailOptions = {
      from: 'Coffee Breaks <mx_eventos@up.edu.mx>',
      to: email,
      subject: "Servicios confirmados para esta semana",
      html: html,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  send_notificacion,
  send_servicios_confirmados,
};
