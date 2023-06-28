import { useState, useEffect } from 'react';
import {get_fetch}  from './get_fetch';

const url_backend  = import.meta.env.VITE_URL_API;

export const useSolicitudes = () => {
    const [solicitudes, setSolicitudes] = useState();
    const [loading, setLoading] = useState(true);

    const after_fetch = (data) => {
        setSolicitudes(data.notificaciones);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        let url = `${url_backend}/solicitudes`;
        const abortController = new AbortController();
        const signal = abortController.signal;
        get_fetch(url,signal, after_fetch);
        return () => abortController.abort();
    }, []);

    return {solicitudes:solicitudes,loading:loading};
}