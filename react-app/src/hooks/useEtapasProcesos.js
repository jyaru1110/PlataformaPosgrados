import { useState, useEffect } from "react";
import { get_fetch } from "./get_fetch";

const url_backend = import.meta.env.VITE_URL_API;

export const useEtapasproceso = (tipo) => {
  const [etapasprocesos, setEtapasprocesos] = useState([]);

  const after_get_etapasprocesos = (data) => {
    setEtapasprocesos(data.etapas);
  };

    

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    get_fetch(
      url_backend + "/etapasprocesos/" + tipo,
      signal,
      after_get_etapasprocesos
    );
    return () => controller.abort();
  }, [tipo]);

  return etapasprocesos;
};
