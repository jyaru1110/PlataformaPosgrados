require('dotenv').config()
var app = require('./app');
var sequelize = require('./database/database');
const Clase = require('./models/Clase');
const Clase_programa = require('./models/Clase_programa');
const Modulo = require('./models/Modulo');
const Programa = require('./models/Programa');
const Puesto_programa = require('./models/Puesto_programa');
const Persona = require('./models/Persona');
const Escuela = require('./models/Escuela');
const Puesto_escuela = require('./models/Puesto_escuela');
const Horario = require('./models/Horario');
const receso = require('./models/receso');
const RolesModulo = require('./models/RolesModulo');
const Salon = require('./models/Salon');
const Servicios_dia = require('./models/Servicios_dia');
const Usuario = require('./models/Usuario');

var port = process.env.PORT || 3900;

async function init() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.');
        await sequelize.sync({ alter: true });
        console.log("All models were synchronized successfully.");
        app.listen(port, () => {
            console.log('Servidor corriendo en http://localhost:'+port);
        });        
    } catch (error) {
        console.error('No se ha podido conectar a la base de datos:', error);
    }
}
init();


