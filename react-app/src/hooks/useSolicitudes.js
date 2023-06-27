import { useState, useEffect } from 'react';
import {get_fetch}  from './get_fetch';

const url_backend  = import.meta.env.VITE_URL_API;

export const useSolicitudes = () => {
    const [solicitudes, setSolicitudes] = useState();
    const [loading, setLoading] = useState(true);

    const after_fetch = (data) => {
        setSolicitudes(data.solicitudes[0]);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        dia = dia.replace(/\//g, "-");
        let url = `${url_backend}/solicitudes`;
        const abortController = new AbortController();
        const signal = abortController.signal;
        get_fetch(url,signal, after_fetch);
        return () => abortController.abort();
    }, [dia]);

    return {servicios:solicitudes,loading:loading};
}