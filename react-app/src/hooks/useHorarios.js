import { useState, useEffect } from 'react';
import {get_fetch}  from './get_fetch';

const host_back  = "localhost";
const port = "3900";

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
        get_fetch("http://"+host_back+":"+port+"/api/horarios",signal,after_fetch)
        return () => controller.abort();
    }, []);

    return {horarios:horarios.horarios,loading:loading};
}