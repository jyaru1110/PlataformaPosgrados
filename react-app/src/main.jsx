import React from 'react'
import ReactDOM from 'react-dom/client'
import HomeGestor from './pages/HomeGestor/index'
import FiltrarHorario from './pages/FiltrarHorario';
import FiltrarIslas from './pages/FiltrarIslas';
import FiltrarServicios from './pages/FiltrarServicios';
import Horario from './pages/Horario';
import Servicio from './pages/Servicio';
import AddServicio from './pages/AddServicio';
import Login from './pages/Login';
import Solicitudes from './pages/Solicitudes';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import HomeSeguimiento from './pages/HomeSeguimiento';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/home-coffee-breaks",
    element: <HomeGestor />
  },
  {
    path: "/filtrar-horario",
    element: <FiltrarHorario />
  },
  {
    path: "/filtrar-islas",
    element: <FiltrarIslas />
  },
  {
    path: "/filtrar-servicios",
    element: <FiltrarServicios />
  },
  {
    path: "/horario",
    element: <Horario />
  },
  {
    path: "/servicio",
    element: <Servicio />
  },
  {
    path: "/add-servicio",
    element: <AddServicio />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/solicitudes",
    element: <Solicitudes />
  },
  {
    path: "/home-seguimiento",
    element: <HomeSeguimiento />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
