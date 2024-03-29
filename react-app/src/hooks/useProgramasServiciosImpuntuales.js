import { useState, useEffect } from "react";
import { get_fetch } from "./get_fetch";

const url_backend = import.meta.env.VITE_URL_API;

export const useProgramasServiciosImpuntuales = (props) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const after_fetch = (data) => {
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    let url = `${url_backend}/programas_servicios_destiempo`;
    const abortController = new AbortController();
    const signal = abortController.signal;
    get_fetch(url, signal, after_fetch, props);
    return () => abortController.abort();
  }, [props.fecha_inicio, props.fecha_fin]);

  return { programas_impuntuales: data, loading_programas_impuntuales: loading };
};
