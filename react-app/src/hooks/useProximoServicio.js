import { useState, useEffect } from 'react';
import {get_fetch}  from './get_fetch';
const url_backend  = import.meta.env.VITE_URL_API;

export const useProximoServicio = () => {
    const [servicio, setServicio] = useState([]);
    const [loading, setLoading] = useState(true);

    const afterFetch = (data) => {
        setServicio(data);
        setLoading(false);
    }

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        get_fetch(url_backend+"/proximo_servicio",signal,afterFetch)
        return () => controller.abort();
    }, []);

    return { servicio: servicio[0], loading:loading};
}