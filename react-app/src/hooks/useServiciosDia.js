import { useState, useEffect } from 'react';
import {get_fetch}  from './get_fetch';

const host_back  = "localhost";
const port = "3900";

export const useServiciosDia = (dia) => {
    const [servicios, setServicios] = useState();
    const [loading, setLoading] = useState(true);

    const after_fetch = (data) => {
        setServicios(data);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        dia = dia.replace(/\//g, "-");
        let url = `http://${host_back}:${port}/api/servicios/${dia}`;
        const abortController = new AbortController();
        const signal = abortController.signal;
        get_fetch(url,signal, after_fetch);
        return () => abortController.abort();
    }, [dia]);

    return {servicios:servicios,loading:loading};
}