require('dotenv').config()
const { Client } = require('pg');

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
  .then(() => console.log('Conexión exitosa a la base de datos PostgreSQL'))
  .catch(err => console.error('Error al conectar a la base de datos', err))
