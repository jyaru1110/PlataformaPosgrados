import { useState, useEffect } from "react";
import { get_fetch } from "./get_fetch";

const url_backend = import.meta.env.VITE_URL_API;

export const useServiciosAprobados = (props) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const after_fetch = (data) => {
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    let url = `${url_backend}/servicios_aprobados`;
    const abortController = new AbortController();
    const signal = abortController.signal;
    get_fetch(url, signal, after_fetch, props);
    return () => abortController.abort();
  }, [props.fecha_inicio, props.fecha_fin, props.escuelas]);

  return { servicios_aprobados: data, loading_aprobados: loading };
};
