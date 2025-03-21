import React from "react";
import { Navigate } from "react-router-dom";
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
import ProgramasAdmin from "./pages/Micrositio/Admin/Programas";
import Programas from "./pages/Micrositio/Programas";
import Personas from "./pages/Micrositio/Admin/Personas";
import Persona from "./pages/Micrositio/Admin/Personas/Persona";
import Programa from "./pages/Micrositio/Admin/Programas/Programa";
import NewPrograma from "./pages/Micrositio/Admin/Programas/New";
import DashboardProgramas from "./pages/Micrositio/Admin/Dashboard";
import NewPersona from "./pages/Micrositio/Admin/Personas/New";
import Metas from "./pages/Micrositio/Admin/Metas";
import Directorio from "./pages/Micrositio/Directorio";
import Proyectos from "./pages/Micrositio/Proyectos";
import Proyecto from "./pages/Micrositio/Proyectos/Proyecto";
import ProyectosAdmin from "./pages/Micrositio/Admin/Proyectos";
import NewProyecto from "./pages/Micrositio/Admin/Proyectos/New";
import ProyectoAdmin from "./pages/Micrositio/Admin/Proyectos/Proyecto";
import PromocionAdmin from "./pages/Micrositio/Admin/Promocion";
import Launchpad from "./pages/Micrositio/Launchpad/Launchpad";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Promocion from "./pages/Micrositio/Promocion";

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
    path: "micrositio",
    element: <Micrositio />,
    children: [
      {path: "", element: <Launchpad />},
      { path: "programas", element: <Programas/> },
      { path: "directorio", element: <Directorio/> },
      { path: "proyectos", element: <Proyectos/> },
      { path: "proyectos/:id", element: <Proyecto/> },
      { path: "promocion", element: <Promocion/> },
      { path: "dashboard/", element: <DashboardProgramas />},
      {
        path: "admin",
        children: [
          { index: true, element: <Navigate to="programas" replace /> },
          {
            path:"proyectos/", element: <ProyectosAdmin/>
          },
          {
            path:"proyectos/new", element: <NewProyecto/>
          },
          {
            path: "proyectos/:id", element: <ProyectoAdmin />,
          },
          {
            path: "programas/",
            element: <ProgramasAdmin />,
          },
          {
            path: "directorio/",
            element: <Personas />,
          },
          {
            path: "programas/new",
            element: <NewPrograma />,
          },
          {
            path: "personas/new",
            element: <NewPersona />,
          },
          {
            path: "programas/:programa",
            element: <Programa />,
          },
          {
            path: "personas/:id",
            element: <Persona />,
          },
          {
            path: "promocion/",
            element: <PromocionAdmin />,
          },
          {
            path: "metas/",
            element: <Metas />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
