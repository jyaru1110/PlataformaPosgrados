import { useState, useEffect } from 'react';
import {get_fetch}  from './get_fetch';
import {programas_to_correct_format} from '../utils/programas_to_correct_format';

const url_backend  = import.meta.env.VITE_URL_API;

export const usePrograma = (escuela) => {
    const [programas, setProgramas] = useState();

    const after_fetch = (data) => {
        setProgramas(programas_to_correct_format(data.programas));
    }

    const get_programas = async () => {
        const controller = new AbortController();
        const signal = controller.signal;
        var url;
        if(escuela === 'Todos')
            url = url_backend+"/programas";
        else
            url = url_backend+"/programas/"+escuela;
        await get_fetch(url,signal,after_fetch)
        return () => controller.abort();
    }

    useEffect(() => {
        get_programas();
    }, [escuela]);

    return programas;
}