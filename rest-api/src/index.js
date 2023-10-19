require("dotenv").config();
const {send_servicios_confirmados} = require( "./mail/nodemailerprovider");
var app = require("./app");
var sequelize = require("./database/database");
const Clase = require("./models/Clase");
const Programa = require("./models/Programa");
const Puesto_programa = require("./models/Puesto_programa");
const Persona = require("./models/Persona");
const Escuela = require("./models/Escuela");
const Puesto_escuela = require("./models/Puesto_escuela");
const Horario = require("./models/Horario");
const receso = require("./models/receso");
const Salon = require("./models/Salon");
const Servicios_dia = require("./models/Servicios_dia");
const Semana = require("./models/Semana");
const Usuario = require("./models/Usuario");
const Notificaciones = require("./models/Notificaciones");
const Etapa = require("./models/Etapa");
const Actividad = require("./models/Actividad");
const Evidencia = require("./models/Evidencia");
const Proceso = require("./models/Proceso");
const ActividadProceso = require("./models/ActividadProceso");
const EvidenciaProceso = require("./models/EvidenciaProceso");
const EtapaProceso = require("./models/EtapaProceso");

var port = process.env.PORT || 3900;

//relaciones de las tablas
Usuario.hasMany(Notificaciones);
Notificaciones.belongsTo(Usuario, {
  foreignKey: "id_usuario",
});

Programa.hasMany(Notificaciones);
Notificaciones.belongsTo(Programa);

Etapa.hasMany(Actividad);
Actividad.belongsTo(Etapa);

Actividad.hasMany(Evidencia);
Evidencia.belongsTo(Actividad);

Programa.hasMany(Proceso);
Proceso.belongsTo(Programa);

Proceso.belongsToMany(Etapa, { through: EtapaProceso });
Etapa.belongsToMany(Proceso, { through: EtapaProceso });

EtapaProceso.belongsToMany(Actividad, { through: ActividadProceso });
Actividad.belongsToMany(EtapaProceso, { through: ActividadProceso });

ActividadProceso.belongsToMany(Evidencia, { through: EvidenciaProceso });
Evidencia.belongsToMany(ActividadProceso, { through: EvidenciaProceso });

//inicio de la aplicacion
async function init() {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida correctamente.");
    console.log("All models were synchronized successfully.");
    app.listen(port, () => {
      console.log("Servidor corriendo en http://localhost:" + port);
    });
  } catch (error) {
    console.error("No se ha podido conectar a la base de datos:", error);
  }
}
init();
