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
import HomeMicrosito from "./pages/Micrositio/Home";
import Programas from "./pages/Micrositio/Admin/Programas";
import Personas from "./pages/Micrositio/Admin/Personas";
import Persona from "./pages/Micrositio/Admin/Personas/Persona";
import Programa from "./pages/Micrositio/Admin/Programas/Programa";
import NewPrograma from "./pages/Micrositio/Admin/Programas/New";
import DashboardProgramas from "./pages/Micrositio/Admin/Dashboard";
import NewPersona from "./pages/Micrositio/Admin/Personas/New";
import Metas from "./pages/Micrositio/Admin/Metas";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

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
    path: "/micrositio",
    element: <Micrositio />,
    children: [
      {
        index: true,
        element: <HomeMicrosito />,
      },
      {
        path: "admin/programas/",
        element: <Programas />,
      },
      {
        path: "admin/personas/",
        element: <Personas />,
      },
      {
        path: "admin/programas/new",
        element: <NewPrograma />,
      },
      {
        path: "admin/personas/new",
        element: <NewPersona />,
      },
      {
        path: "admin/programas/:programa",
        element: <Programa />,
      },
      {
        path: "admin/personas/:id",
        element: <Persona />,
      },
      {
        path: "admin/dashboard/",
        element: <DashboardProgramas />,
      },
      {
        path: "admin/metas/",
        element: <Metas />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
