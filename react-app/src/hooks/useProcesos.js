import { useState, useEffect } from 'react';
import {get_fetch}  from './get_fetch';
const url_backend  = import.meta.env.VITE_URL_API;

export const useProcesos = () => {
    const [procesos, setProcesos] = useState();
    const [loading, setLoading] = useState(true);

    const after_fetch = (data) => {
        setProcesos(data.procesos);
        setLoading(false);
    }

    const get_data = async () => {
        setLoading(true);
        const url = `${url_backend}/procesos`;
        const abortController = new AbortController();
        const signal = abortController.signal;
        await get_fetch(url,signal, after_fetch);
        return () => abortController.abort();
    }

    useEffect(() => {
       get_data();
    }, []);

    return {procesos:procesos,loading:loading};
};