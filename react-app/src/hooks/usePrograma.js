import { useState, useEffect } from 'react';
import {get_fetch}  from './get_fetch';

const url_backend  = import.meta.env.VITE_URL_API;

export const usePrograma = (escuela) => {
    const [programas, setProgramas] = useState([]);

    const after_fetch = (data) => {
        setProgramas(data);
    }

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        var url;
        if(escuela === 'Todos')
            url = url_backend+"/programas";
        else
            url = url_backend+"/programas/"+escuela;
        get_fetch(url,signal,after_fetch)
        return () => controller.abort();
    }, [escuela]);

    return programas.programas;
}