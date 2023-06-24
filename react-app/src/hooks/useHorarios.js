import { useState, useEffect } from 'react';
import {get_fetch}  from './get_fetch';

const url_backend  = import.meta.env.VITE_URL_API;

export const useHorarios = () => {
    const [horarios, setHorarios] = useState([]);
    const [loading, setLoading] = useState(true);

    const after_fetch = (data) => {
        setHorarios(data);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        const controller = new AbortController();
        const signal = controller.signal;
        get_fetch(url_backend+"/horarios",signal,after_fetch)
        return () => controller.abort();
    }, []);
    return {horarios:horarios.horarios,loading:loading};
}