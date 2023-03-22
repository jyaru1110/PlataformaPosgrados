import { useState, useEffect } from 'react';
import {get_fetch}  from './get_fetch';
import { date_to_dd_month_yyyy } from '../utils/date_to_string';

export const useProximoServicio = () => {
    const [servicio, setServicio] = useState([]);

    const after_fetch = (data) => {
        data[0].fecha = date_to_dd_month_yyyy(data[0].fecha);
        setServicio(data);
    }

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        get_fetch("http://localhost:3900/api/proximo_servicio",signal,after_fetch)
        return () => controller.abort();
    }, []);

    return servicio[0];
}