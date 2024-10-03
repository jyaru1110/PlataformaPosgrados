import { useState, useEffect } from "react";
const url_backend = import.meta.env.VITE_URL_API;
import { get_fetch } from "./get_fetch";

export default function useUsersByPuesto() {
    const [puestos, setPuestos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const after_fetch = (data) => {
        setPuestos(data);
        setLoading(false);
    }

    const onError = (err) => {
        setError(true);
        toast.error(err.response.data.message);
    }

    useEffect(() => {
        setLoading(true);
        let url = `${url_backend}/users/bypuesto`;
        const abortController = new AbortController();
        const signal = abortController.signal;
        get_fetch(url, signal, after_fetch, {}, onError);
        return () => abortController.abort();
    }, []);
    
    return {
        puestos: puestos,
        loading: loading,
        error: error,
    };
}