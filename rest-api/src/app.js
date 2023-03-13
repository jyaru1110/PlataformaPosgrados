var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var servicios_dia_routes = require('./routes/servicios_dia.routes');
var cors = require('cors');
//cargar archivos de rutas
app.use(servicios_dia_routes);
//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//cors
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
//exportar
module.exports = app;