require('dotenv').config()
const { Client } = require('pg');

var app = require('./app');
var port = process.env.PORT || 3900;


const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const client = new Client({
  user: user,
  host: 'localhost',
  database: DB_NAME,
  password: password,
  port: 5432,
});

client.connect()
  .then(() => {
    console.log('Conexión exitosa a la base de datos PostgreSQL');
    //creación del servidor
    app.listen(port, () => {
      console.log('Servidor del api rest escuchando en http://localhost:'+port);
    });
  })
  .catch(err => console.error('Error al conectar a la base de datos', err))

  app.get('/get_all_servicios_dia', (req, res) => {
    client.query('SELECT * FROM servicios_dia', (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  });

  app.get('/get_servicios_semana', (req, res) => {
    client.query('select get_servicios_semana();', (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  });

  app.get('/get_servicios_escuela', (req, res) => {
    client.query("select * from servicios_dia inner join programa on programa.programa=servicios_dia.programa inner join escuela on programa.escuela = escuela.escuela where escuela.escuela = '"+req.query.escuela+"';", (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  });
  
  app.get('/get_servicios_isla', (req, res) => {
    client.query("select * from servicios_dia inner join salon on salon.salon=servicios_dia.salon where salon.isla = '"+req.query.isla+"';", (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  });


//exportar cliente
module.exports = client;
  