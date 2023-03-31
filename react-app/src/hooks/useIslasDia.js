import { useEffect, useState } from 'react';
import {get_fetch}  from './get_fetch';
import { month_day_year_to_year_month_day } from '../utils/date_to_string';

const host_back  = "localhost";
const port = "3900";

export const useIslasDia = (fecha) => {
    const [sumasIslas, setSumasIslas] = useState([]);
    const [loading, setLoading] = useState(false);

    const after_fetch = (data) => {
        setSumasIslas(data.servicio[0]);
        setLoading(false);
    }
    useEffect(() => {
        setLoading(true);
        fecha = month_day_year_to_year_month_day(fecha);
        const controller = new AbortController();
        const signal = controller.signal;
        get_fetch("http://"+host_back+":"+port+"/api/servicios_isla_dia/"+fecha,signal,after_fetch)
        return () => controller.abort();
    }, [fecha]);

    if(sumasIslas.servicio)
        return {sumasIslas,loading:loading};

    return {sumas:sumasIslas,loading:loading};
}