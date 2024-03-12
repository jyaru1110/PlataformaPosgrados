require("dotenv").config();
const { send_servicios_confirmados } = require("./mail/nodemailerprovider");
var app = require("./app");
var sequelize = require("./database/database");
const Clase = require("./models/Clase");
const Programa = require("./models/Programa");
const PuestoPrograma = require("./models/PuestoPrograma");
const Escuela = require("./models/Escuela");
const PuestoEscuela = require("./models/PuestoEscuela");
const Horario = require("./models/Horario");
const receso = require("./models/receso");
const Salon = require("./models/Salon");
const Servicios_dia = require("./models/Servicios_dia");
const Semana = require("./models/Semana");
const Usuario = require("./models/Usuario");
const Notificaciones = require("./models/Notificaciones");
const Etapa = require("./models/Etapa");
const Actividad = require("./models/Actividad");
const Proceso = require("./models/Proceso");
const ActividadProceso = require("./models/ActividadProceso");
const EtapaProceso = require("./models/EtapaProceso");
const CostosPrograma = require("./models/CostosPrograma");

var port = process.env.PORT || 3900;

//relaciones de las tablas

//puestos programa
Programa.belongsToMany(Usuario, {
  through: PuestoPrograma,
  timestamps: false,
});
Usuario.belongsToMany(Programa, {
  through: PuestoPrograma,
  timestamps: false,
});
Programa.hasMany(PuestoPrograma);
PuestoPrograma.belongsTo(Programa);
Usuario.hasMany(PuestoPrograma);
PuestoPrograma.belongsTo(Usuario);

//puestos escuela
Escuela.belongsToMany(Usuario, {
  through: PuestoEscuela,
  timestamps: false,
});
Usuario.belongsToMany(Escuela, {
  through: PuestoEscuela,
  timestamps: false,
});
Escuela.hasMany(PuestoEscuela);
PuestoEscuela.belongsTo(Escuela);
Usuario.hasMany(PuestoEscuela);
PuestoEscuela.belongsTo(Usuario);

//programas y costos
Programa.hasMany(CostosPrograma);
CostosPrograma.belongsTo(Programa);

//programas con servicios_dia
Programa.hasMany(Servicios_dia);
Servicios_dia.belongsTo(Programa, {
  foreignKey: "programaPrograma",
});

//notificaciones
Usuario.hasMany(Notificaciones);
Notificaciones.belongsTo(Usuario, {
  foreignKey: "id_usuario",
});
Programa.hasMany(Notificaciones);
Notificaciones.belongsTo(Programa);

//seguimiento de posgrados
Etapa.hasMany(Actividad);
Actividad.belongsTo(Etapa);

Programa.hasMany(Proceso);
Proceso.belongsTo(Programa);

Proceso.belongsToMany(Etapa, { through: EtapaProceso });
Etapa.belongsToMany(Proceso, { through: EtapaProceso });
Proceso.hasMany(EtapaProceso);
EtapaProceso.belongsTo(Proceso);
Etapa.hasMany(EtapaProceso);
EtapaProceso.belongsTo(Etapa);

EtapaProceso.belongsToMany(Actividad, { through: ActividadProceso });
Actividad.belongsToMany(EtapaProceso, { through: ActividadProceso });
EtapaProceso.hasMany(ActividadProceso);
ActividadProceso.belongsTo(EtapaProceso);
Actividad.hasMany(ActividadProceso);
ActividadProceso.belongsTo(Actividad);

//programas y usuarios
Usuario.belongsToMany(Programa, {
  through: "usuario_programa",
  timestamps: false,
});
Programa.belongsToMany(Usuario, {
  through: "usuario_programa",
  timestamps: false,
});

//inicio de la aplicacion
async function init() {
  try {
    //await sequelize.sync({ alter: false });
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
