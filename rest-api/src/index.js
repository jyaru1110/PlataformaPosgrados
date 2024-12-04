require("dotenv").config();
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
const AperturasCierres = require("./models/AperturasCierres");
const Periodo = require("./models/Periodo");
const PeriodoPrograma = require("./models/PeriodoPrograma");
const Proyecto = require("./models/Proyecto");
const FechaProyecto = require("./models/FechaProyecto")

var port = process.env.PORT || 3900;

//relaciones de las tablas

//programas y periodos
Programa.belongsToMany(Periodo, {
  through: PeriodoPrograma,
});
Periodo.belongsToMany(Programa, {
  through: PeriodoPrograma,
});
Programa.hasMany(PeriodoPrograma);
PeriodoPrograma.belongsTo(Programa);
Periodo.hasMany(PeriodoPrograma);
PeriodoPrograma.belongsTo(Periodo);

//aperturas y cierres de cada programa
Programa.hasMany(AperturasCierres);
AperturasCierres.belongsTo(Programa);

//aperturas y periodos
PeriodoPrograma.hasMany(AperturasCierres);
AperturasCierres.belongsTo(PeriodoPrograma);

//puestos programa
Programa.belongsToMany(Usuario, {
  through: PuestoPrograma,
});
Usuario.belongsToMany(Programa, {
  through: PuestoPrograma,
});
Programa.hasMany(PuestoPrograma);
PuestoPrograma.belongsTo(Programa);
Usuario.hasMany(PuestoPrograma);
PuestoPrograma.belongsTo(Usuario);

//puestos escuela
Escuela.belongsToMany(Usuario, {
  through: PuestoEscuela,
});
Usuario.belongsToMany(Escuela, {
  through: PuestoEscuela,
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

//proyectos y fechas
Proyecto.hasMany(FechaProyecto);
FechaProyecto.belongsTo(Proyecto);


//inicio de la aplicacion
async function init() {
  try {
    //await sequelize.sync({ alter: true });
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
