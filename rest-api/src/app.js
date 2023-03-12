var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var servicios_dia_routes = require('./routes/servicios_dia.routes');
//cargar archivos de rutas
app.use(servicios_dia_routes);
//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//cors
//exportar
module.exports = app;