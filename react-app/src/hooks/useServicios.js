import { useState, useEffect } from 'react';
import {get_fetch}  from './get_fetch';

const host_back  = "192.168.0.5";
const port = "3900";

export const useServicios = () => {
    const [servicios, setServicios] = useState();
    const [loading, setLoading] = useState(true);

    const after_fetch = (data) => {
        setServicios(data);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        let url = `http://${host_back}:${port}/api/servicios`;
        const abortController = new AbortController();
        const signal = abortController.signal;
        get_fetch(url,signal, after_fetch);
        return () => abortController.abort();
    }, []);

    return {servicios:servicios,loading:loading};
}