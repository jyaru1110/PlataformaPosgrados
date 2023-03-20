import React from 'react'
import ReactDOM from 'react-dom/client'
import HomeGestor from './pages/HomeGestor/index'
import FiltrarHorario from './pages/FiltrarHorario/index';
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
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
