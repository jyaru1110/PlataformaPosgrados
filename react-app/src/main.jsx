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
import Callback from './pages/Callback';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
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
    path: "/callback",
    element: <Callback />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
