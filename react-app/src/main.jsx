import React from "react";
import ReactDOM from "react-dom/client";
import HomeGestor from "./pages/CoffeeBreaks/HomeGestor";
import FiltrarHorario from "./pages/CoffeeBreaks/FiltrarHorario";
import FiltrarIslas from "./pages/CoffeeBreaks/FiltrarIslas";
import FiltrarServicios from "./pages/CoffeeBreaks/FiltrarServicios";
import Horario from "./pages/CoffeeBreaks/Horario";
import Servicio from "./pages/CoffeeBreaks/Servicio";
import AddServicio from "./pages/CoffeeBreaks/AddServicio";
import Login from "./pages/Login";
import Solicitudes from "./pages/CoffeeBreaks/Solicitudes";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import HomeSeguimiento from "./pages/SeguimientoPosgrados/HomeSeguimiento";
import Confirmados from "./pages/CoffeeBreaks/Confirmados";
import EtapasProceso from "./pages/SeguimientoPosgrados/EtapasProceso";
import Dashboard from "./pages/CoffeeBreaks/Dashboard";
import Micrositio from "./pages/Micrositio";
import Programas from "./pages/Micrositio/Admin/Programas";
import Personas from "./pages/Micrositio/Admin/Personas";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Admin from "./pages/Micrositio/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/home-coffee-breaks",
    element: <HomeGestor />,
  },
  {
    path: "/filtrar-horario",
    element: <FiltrarHorario />,
  },
  {
    path: "/filtrar-islas",
    element: <FiltrarIslas />,
  },
  {
    path: "/filtrar-servicios",
    element: <FiltrarServicios />,
  },
  {
    path: "/horario/:id",
    element: <Horario />,
  },
  {
    path: "/servicio/:id",
    element: <Servicio />,
  },
  {
    path: "/add-servicio",
    element: <AddServicio />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/solicitudes",
    element: <Solicitudes />,
  },
  {
    path: "/confirmados",
    element: <Confirmados />,
  },
  {
    path: "seguimientoposgrados",
    element: <HomeSeguimiento />,
  },
  {
    path: "seguimientoposgrados/etapasprocesos",
    element: <EtapasProceso />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path:"/micrositio",
    element: <Micrositio />,
    children: [
      {
        path: "admin/",
        element: <Admin />,
      },
      {
        path: "admin/programas/",
        element: <Programas />,
      },
      {
        path: "admin/personas/",
        element: <Personas />,
      }
    ],
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
