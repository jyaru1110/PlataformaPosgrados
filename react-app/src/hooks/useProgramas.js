import { useState, useEffect } from "react";
import { get_fetch } from "./get_fetch";
import { programas_to_correct_format } from "../utils/programas_to_correct_format";

const url_backend = import.meta.env.VITE_URL_API;

export const useProgramasOpciones = (escuela) => {
  const [programas, setProgramas] = useState([]);
  const [loading, setLoading] = useState(true);

  const after_fetch = (data) => {
    setLoading(false);
    setProgramas(programas_to_correct_format(data.programas));
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    let url;
    if (escuela === "Todos") url = url_backend + "/programas_opciones";
    else if(escuela === "Metas") url = url_backend + "/programas_metas";
    else url = url_backend + "/programas/" + escuela;
    get_fetch(url, signal, after_fetch);
    return () => controller.abort();
  }, [escuela]);

  return { programas, loading };
};

export const useProgramas = (query) => {
  const [programas, setProgramas] = useState([]);
  const [loading, setLoading] = useState(true);

  const after_fetch = (data) => {
    setLoading(false);
    setProgramas(data);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    get_fetch(url_backend + "/programas/", signal, after_fetch, {
      query: query,
    });
    return () => controller.abort();
  }, [query]);

  return { programas, loading };
};

export const usePrograma = (programa) => {
  const [programaData, setProgramaData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const after_fetch = (data) => {
    setLoading(false);
    setProgramaData(data);
  };

  const error_func = (err) => {
    console.log(err);
    setLoading(false);
    setError(err);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    get_fetch(
      url_backend + "/programa/" + programa,
      signal,
      after_fetch,
      {},
      error_func
    );
    return () => controller.abort();
  }, [programa]);

  return { programaData, loading, error };
};
