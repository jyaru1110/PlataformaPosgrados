import { useEffect, useState } from 'react';
import {get_fetch}  from './get_fetch';

const host_back  = "192.168.0.5";
const port = "3900";

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
        get_fetch("http://"+host_back+":"+port+"/api/suma_servicios_dia_isla/"+fecha_inicio+"/"+fecha_fin,signal,after_fetch)
        return () => controller.abort();
    }, [fecha_inicio,fecha_fin]);

    if(sumasIslas.servicio)
        return {sumasIslas,loading:loading};

    return {sumasIslas:sumasIslas,loading:loading};
}