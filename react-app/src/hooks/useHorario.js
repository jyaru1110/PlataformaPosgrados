import { useState, useEffect } from 'react';
import {get_fetch}  from './get_fetch';

const url_backend  = import.meta.env.VITE_URL_API;

export const useHorario = (id_horario) => {
    const [horario, setHorario] = useState([]);
    const [loading, setLoading] = useState(true);

    const after_fetch = (data) => {
        setHorario(data);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        const controller = new AbortController();
        const signal = controller.signal;
        get_fetch(url_backend+"/horario/"+id_horario,signal,after_fetch);
        return () => controller.abort();
    }, [id_horario]);

    return {horario:horario.horario,loading:loading};
}