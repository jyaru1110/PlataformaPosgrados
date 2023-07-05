const express = require("express");
require("./auth/passportGoogleSSO");
require('dotenv').config()
const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const app = express();
const servicios_dia_routes = require("./routes/servicios_dia.routes");
const solicitudes_routes = require("./routes/solicitudes.routes");
const horarios_routes = require("./routes/horarios.routes");
const clases_routes = require("./routes/clases.routes");
const salones_routes = require("./routes/salones.routes");
const programas_routes = require("./routes/programas.routes");
const auth_routes = require("./routes/auth.routes");
const user_routes = require("./routes/user.routes");
const cors = require("cors");


//permite que cualquier dominio pueda hacer peticiones a la api
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
//middlewares

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({ origin: "https://coffee-breaks.vercel.app", credentials: true}));
app.use(express.json());

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["session","session.sig"],
    sameSite: "none",
    secureProxy: true,
    secure: true,
    domain: "https://coffee-breaks.vercel.app",
  })
);

app.use(passport.initialize());
app.use(passport.session());
//cargar archivos de rutas
app.use("/api", solicitudes_routes);
app.use("/api", servicios_dia_routes);
app.use("/api", auth_routes);
app.use("/api", horarios_routes);
app.use("/api", clases_routes);
app.use("/api", salones_routes);
app.use("/api", programas_routes);
app.use("/api", user_routes);

module.exports = app;
