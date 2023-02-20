var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var client = require('./index');
//cargar archivos de rutas

//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//cors
//rutas
app.get('/pruebas', (req, res) => {
    res.status(200).send({message: 'prueba de ruta'});
});
app.get('/pruebas/:id', (req, res) => {
    console.log(req.params);
    res.status(200).send({message: 'prueba de ruta con id',
    id: req.params.id});
});
//connectarse a la base de datos
app.get('/servicios', (req, res) => {
    client.query('SELECT * FROM servicios_dia', (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  });

//exportar
module.exports = app;