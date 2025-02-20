const express = require("express");
require("./auth/passportGoogleSSO");
require('dotenv').config()
const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const app = express();
const proyectos_routes = require("./routes/proyectos.routes")
const servicios_dia_routes = require("./routes/servicios_dia.routes");
const solicitudes_routes = require("./routes/solicitudes.routes");
const horarios_routes = require("./routes/horarios.routes");
const clases_routes = require("./routes/clases.routes");
const salones_routes = require("./routes/salones.routes");
const programas_routes = require("./routes/programas.routes");
const auth_routes = require("./routes/auth.routes");
const user_routes = require("./routes/user.routes");
const procesos_routes = require("./routes/proceso.routes");
const environment =  process.env.ENV
const cors = require("cors");

//permite que cualquier dominio pueda hacer peticiones a la api
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
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

app.use(cors({ origin: environment=="Production"?"https://coffee-breaks.vercel.app":environment=="test"?"https://posgradospanamericana.up.edu.mx":"http://localhost:5173", credentials: true}));
app.use(express.json());

app.set("trust proxy", 1);

app.use(
  cookieSession({
    name: "session",
    maxAge: 3599*1000,
    keys: ["session","session.sig"],
    secure: environment=="Production"?true:false,
    sameSite: environment=="Production"?"none":"strict"
  })
);

app.use(passport.initialize());
app.use(passport.session());
//cargar archivos de rutas
app.use("/api", procesos_routes);
app.use("/api", solicitudes_routes);
app.use("/api", servicios_dia_routes);
app.use("/api", auth_routes);
app.use("/api", horarios_routes);
app.use("/api", clases_routes);
app.use("/api", salones_routes);
app.use("/api", programas_routes);
app.use("/api", user_routes);
app.use("/api", proyectos_routes)

module.exports = app;
