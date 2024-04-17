import { useState, useEffect } from "react";
import { get_fetch } from "./get_fetch";
import { toast } from "react-toastify";

const url_backend = import.meta.env.VITE_URL_API;

export const usePieMetas = ({ escuelas, periodo }) => {
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
    let url = `${url_backend}/metas/${periodo}`;
    const abortController = new AbortController();
    const signal = abortController.signal;
    get_fetch(url, signal, after_fetch, escuelas, onError);
    return () => abortController.abort();
  }, [escuelas, periodo]);

  return {
    data_pie: data,
    loading_pie: loading,
    error_pie: error,
  };
};
