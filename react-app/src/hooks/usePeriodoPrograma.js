import { useEffect, useState } from "react";
import { get_fetch } from "./get_fetch";

const url_backend = import.meta.env.VITE_URL_API;

export const usePeriodoPrograma = () => {
  const [metas, setPeriodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const after_fetch = (data) => {
    setPeriodos(data);
    setLoading(false);
  };

  const update = (signal) => {
    setLoading(true);
    get_fetch(url_backend + "/programas/periodos/", signal, after_fetch);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    update(signal);
    return () => controller.abort();
  }, []);

  return { metas, loading, update};
};
