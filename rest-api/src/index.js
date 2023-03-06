require('dotenv').config()
var app = require('./app');
var sequelize = require('./database/database');
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


