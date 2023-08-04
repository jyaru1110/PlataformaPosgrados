require('dotenv').config()
var app = require('./app');
var sequelize = require('./database/database');
const Clase = require('./models/Clase');
const Programa = require('./models/Programa');
const Puesto_programa = require('./models/Puesto_programa');
const Persona = require('./models/Persona');
const Escuela = require('./models/Escuela');
const Puesto_escuela = require('./models/Puesto_escuela');
const Horario = require('./models/Horario');
const receso = require('./models/receso');
const Salon = require('./models/Salon');
const Servicios_dia = require('./models/Servicios_dia');
const Semana = require('./models/Semana');
const Usuario = require('./models/Usuario');
const Notificaciones = require('./models/Notificaciones');

var port = process.env.PORT || 3900;


Usuario.hasMany(Notificaciones);
Notificaciones.belongsTo(Usuario, {
  foreignKey: "id_usuario",
});


async function init() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: false });
        console.log('Conexión a la base de datos establecida correctamente.');
        console.log("All models were synchronized successfully.");
        app.listen(port, () => {
            console.log('Servidor corriendo en http://localhost:'+port);
        });        
    } catch (error) {
        console.error('No se ha podido conectar a la base de datos:', error);
    }
}
init();


