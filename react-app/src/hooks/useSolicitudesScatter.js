import { useState, useEffect } from "react";
import { get_fetch } from "./get_fetch";

const url_backend = import.meta.env.VITE_URL_API;

export const useSolicitudesScatter = ({ fecha_inicio, fecha_fin }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const after_fetch = (data) => {
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fecha_inicio = fecha_inicio.replace(/\//g, "-");
    fecha_fin = fecha_fin.replace(/\//g, "-");
    let url = `${url_backend}/solicitudes_scatter/${fecha_inicio}/${fecha_fin}`;
    const abortController = new AbortController();
    const signal = abortController.signal;
    get_fetch(url, signal, after_fetch);
    return () => abortController.abort();
  }, [fecha_inicio, fecha_fin]);

  return { scatter_solicitudes: data, loading_scatter_solicitudes: loading };
};
