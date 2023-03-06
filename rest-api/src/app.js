var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var servicios_dia_routes = require('./routes/servicios_dia.routes');
//cargar archivos de rutas

//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//cors
//rutas
app.use(servicios_dia_routes);
//exportar
module.exports = app;