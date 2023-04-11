import { useState, useEffect } from 'react';
import {get_fetch}  from './get_fetch';

const host_back  = "192.168.0.5";
const port = "3900";

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
        get_fetch("http://"+host_back+":"+port+"/api/horario/"+id_horario,signal,after_fetch);
        return () => controller.abort();
    }, [id_horario]);

    return {horario:horario.horario,loading:loading};
}