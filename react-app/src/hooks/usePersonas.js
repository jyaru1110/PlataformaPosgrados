import { useState, useEffect } from "react";
import { get_fetch } from "./get_fetch";

const url_backend = import.meta.env.VITE_URL_API;

export const usePersonas = (query) => {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);

  const after_fetch = (data) => {
    setLoading(false);
    setPersonas(data);
  };

  const onError = (error) => {
    setLoading(false);
    console.log(error);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    get_fetch(
      url_backend + "/user/all",
      signal,
      after_fetch,
      { query: query },
      onError
    );
    return () => controller.abort();
  }, [query]);

  return { personas, loading };
};

export const usePersonasAdmin = (query) => {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);

  const after_fetch = (data) => {
    setLoading(false);
    setPersonas(data);
  };

  const onError = (error) => {
    setLoading(false);
    console.log(error);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    get_fetch(
      url_backend + "/user/all/admin",
      signal,
      after_fetch,
      { query: query },
      onError
    );
    return () => controller.abort();
  }, [query]);

  return { personas, loading };
}

export const usePersona = (id) => {
  const [persona, setPersona] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const after_fetch = (data) => {
    setLoading(false);
    setPersona(data);
  };

  const onError = (error) => {
    setLoading(false);
    setError(error);
  };


  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    get_fetch(
      url_backend + "/user/" + id,
      signal,
      after_fetch,
      {},
      onError
    );
    return () => controller.abort();
  }, []);

  return { persona, loading, error };
};
