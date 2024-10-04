import { useState, useEffect } from "react";
import { get_fetch } from "./get_fetch";

const url_backend = import.meta.env.VITE_URL_API;

export const useServiciosConfirmados = () => {
  const [servicios, setServicios] = useState([]);
  const [aprobados, setAprobados] = useState(false);

  const after_get_clases = (data) => {
    setServicios(data.servicios);
    setAprobados(data.hayAprobados);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    get_fetch(url_backend + "/servicios_confirmados", signal, after_get_clases);
    return () => controller.abort();
  }, []);

  return { servicios, aprobados };
};
