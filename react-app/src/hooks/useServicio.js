import { useState, useEffect } from 'react';
import {get_fetch}  from './get_fetch';


const url_backend  = import.meta.env.VITE_URL_API;

export const useServicio = (id) => {
    const [servicio, setServicio] = useState([]);
    const [loading, setLoading] = useState(true);

    const after_fetch = (data) => {
        setServicio(data);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        const controller = new AbortController();
        const signal = controller.signal;
        get_fetch(url_backend+"/servicio/"+id,signal,after_fetch);
        return () => controller.abort();
    }, [id]);

    return {servicio:servicio.servicio,loading:loading};
}