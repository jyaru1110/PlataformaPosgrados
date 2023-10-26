import { useState, useEffect } from "react";
import { get_fetch } from "./get_fetch";

const url_backend = import.meta.env.VITE_URL_API;

export const useEtapasproceso = (tipo) => {
  const [etapasprocesos, setEtapasprocesos] = useState([]);

  const after_get_etapasprocesos = (data) => {
    setEtapasprocesos(data.etapas);
  };

  const get_etapas_procesos = async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    await get_fetch(
      url_backend + "/etapasprocesos/" + tipo,
      signal,
      after_get_etapasprocesos
    );
    return () => controller.abort();
  };

  useEffect(() => {
    get_etapas_procesos();
  }, [tipo]);

  return etapasprocesos;
};
