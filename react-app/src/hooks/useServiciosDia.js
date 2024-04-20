import { useState, useEffect } from "react";
import { get_fetch } from "./get_fetch";

const url_backend = import.meta.env.VITE_URL_API;

export const useServiciosDia = (dia) => {
  const [servicios, setServicios] = useState();
  const [loading, setLoading] = useState(true);

  const after_fetch = (data) => {
    setServicios(data.servicio[0]);
    setLoading(false);
  };

  const reverse_date = (date) => {
    const array = date?.split("/");

    const res = array[2] + "-" + array[0] + "-" + array[1];
    return res;
  };

  useEffect(() => {
    setLoading(true);
    let url = `${url_backend}/servicios_pendientes/${reverse_date(dia)}`;
    const abortController = new AbortController();
    const signal = abortController.signal;
    get_fetch(url, signal, after_fetch);
    return () => abortController.abort();
  }, [dia]);

  return { servicios: servicios, loading: loading };
};
