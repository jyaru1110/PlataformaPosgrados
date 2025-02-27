import { useState, useEffect } from "react";
import { get_fetch } from "./get_fetch";
import { toast } from "react-toastify";

const url_backend = import.meta.env.VITE_URL_API;

export const useMetasEscuela = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const after_fetch = (data) => {
    setData(data);
    setLoading(false);
  };

  const onError = (err) => {
    setError(true);
    toast.error(err.response.data.message);
  };

  useEffect(() => {
    setLoading(true);
    let url = `${url_backend}/escuelas/periodos`;
    const abortController = new AbortController();
    const signal = abortController.signal;
    get_fetch(url, signal, after_fetch,{}, onError);
    return () => abortController.abort();
  }, []);

  return {
    data: data,
    loading: loading,
    error: error,
  };
};

export const usePeriodoEscuela = (escuela, pagina) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const after_fetch = (data) => {
    setData(data);
    setLoading(false);
  };

  const onError = (err) => {
    setError(true);
    toast.error(err.response.data.message);
  };

  useEffect(() => {
    setLoading(true);
    let url = `${url_backend}/escuela/periodos/${escuela}?pagina=${pagina}`;
    const abortController = new AbortController();
    const signal = abortController.signal;
    get_fetch(url, signal, after_fetch,{}, onError);
    return () => abortController.abort();
  }, [escuela, pagina]);

  return {
    data: data,
    loading: loading,
    error: error,
  };
};

export const useUltimaActualizacionPeriodoEscuela = (escuela,periodo) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const after_fetch = (data) => {
    setData(data);
    setLoading(false);
  };

  const onError = (err) => {
    setError(true);
    toast.error(err.response.data.message);
  };

  useEffect(() => {
    setLoading(true);
    let url = `${url_backend}/periodos/last/${escuela}?periodo=${periodo}`;
    const abortController = new AbortController();
    const signal = abortController.signal;
    get_fetch(url, signal, after_fetch,{}, onError);
    return () => abortController.abort();
  }, [escuela,periodo]);

  return {
    data: data,
    loading: loading,
    error: error,
  };
};
