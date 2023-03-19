import { useState, useEffect } from 'react';
import {get_fetch}  from './get_fetch';
import { date_to_dd_month_yyyy } from '../utils/date_to_string';

export const useServiciosDia = (dia) => {

    const [servicios, setServicios] = useState();
    const [loading, setLoading] = useState(true);

    const after_fetch = (data) => {
        setServicios(data);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        let url = `http://192.168.0.15:3900/api/servicios_por_fecha?fecha=${dia}`;
        const abortController = new AbortController();
        const signal = abortController.signal;
        get_fetch(url,signal, after_fetch);
        return () => abortController.abort();
    }, [dia]);

    return {servicios:servicios,loading:loading};
}