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

  const update = () => {
    setLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    get_fetch(url_backend + "/programas/periodos/", signal, after_fetch);
    return () => controller.abort();
  };

  useEffect(() => {
    update();
  }, []);

  return { metas, loading, update};
};
