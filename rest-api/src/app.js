var express = require('express');
require('./auth/passportGoogleSSO');
const passport = require('passport');
const cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var app = express();
var servicios_dia_routes = require('./routes/servicios_dia.routes');
var horarios_routes = require('./routes/horarios.routes');
var clases_routes = require('./routes/clases.routes');
var salones_routes = require('./routes/salones.routes');
var programas_routes = require('./routes/programas.routes');
var auth_routes = require('./routes/auth.routes');

//permite que cualquier dominio pueda hacer peticiones a la api
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//middleware
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
/*app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}));*/
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
//cargar archivos de rutas
app.use('/api',servicios_dia_routes);
app.use('/api',auth_routes);
app.use('/api',horarios_routes);
app.use('/api',clases_routes);
app.use('/api',salones_routes);
app.use('/api',programas_routes);
//exportar
module.exports = app;