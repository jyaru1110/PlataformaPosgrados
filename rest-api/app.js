var express = require('express');
var bodyParser = require('body-parser');
var app = express();
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
//exportar
module.exports = app;