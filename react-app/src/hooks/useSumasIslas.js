import { useEffect, useState } from 'react';
import {get_fetch}  from './get_fetch';

const url_backend  = import.meta.env.VITE_URL_API;

export const useSumasIslas = (fecha_inicio,fecha_fin) => {
    const [sumasIslas, setSumasIslas] = useState([]);
    const [loading, setLoading] = useState(false);

    const after_fetch = (data) => {
        setSumasIslas(data.servicio[0]);
        setLoading(false);
    }
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        get_fetch(url_backend+"/suma_servicios_dia_isla/"+fecha_inicio+"/"+fecha_fin,signal,after_fetch)
        return () => controller.abort();
    }, [fecha_inicio,fecha_fin]);

    if(sumasIslas.servicio)
        return {sumasIslas,loading:loading};

    return {sumasIslas:sumasIslas,loading:loading};
}