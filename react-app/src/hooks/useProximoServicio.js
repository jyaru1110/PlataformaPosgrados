import { useState, useEffect } from 'react';
import {get_fetch}  from './get_fetch';

const url_backend  = import.meta.env.VITE_URL_API;

export const useProximoServicio = () => {
    const [servicio, setServicio] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        get_fetch(url_backend+"/proximo_servicio",signal,setServicio)
        return () => controller.abort();
    }, []);

    return servicio[0];
}