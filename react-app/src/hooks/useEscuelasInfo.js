import { useEffect, useState } from "react";
import { get_fetch } from "./get_fetch";

const url_backend = import.meta.env.VITE_URL_API;

export const useEscuelasInfo = () => {
    const [escuelas, setEscuelas] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const after_fetch = (data) => {
      setLoading(false);
      setEscuelas(data);
    };
  
    useEffect(() => {
      const controller = new AbortController();
      const signal = controller.signal;
      setLoading(true);
      get_fetch(url_backend + "/escuelas/full", signal, after_fetch);
      return () => controller.abort();
    }, []);
  
    return { escuelas , loading };
  };