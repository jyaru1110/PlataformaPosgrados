import { useState, useEffect } from 'react';
import {get_fetch}  from './get_fetch';
import {clases_to_correct_format} from '../utils/clases_to_correct_format';

const url_backend  = import.meta.env.VITE_URL_API;

export const useServiciosConfirmados = () => {
    const [servicios, setServicios] = useState([]);

    const after_get_clases = (data) => {
        setServicios(data.servicios);
    }

    const get_clases = async () => {
        const controller = new AbortController();
        const signal = controller.signal;
        await get_fetch(url_backend+"/servicios/confirmados",signal,after_get_clases);
        return () => controller.abort();
    }

    useEffect(() => {
        get_clases();
    }, []);

    return servicios;
}