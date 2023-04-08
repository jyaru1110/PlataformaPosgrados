import { useState, useEffect } from 'react';
import {get_fetch}  from './get_fetch';

const host_back  = "192.168.0.5";
const port = "3900";

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
            url = "http://"+host_back+":"+port+"/api/programas";
        else
            url = "http://"+host_back+":"+port+"/api/programas/"+escuela;
        get_fetch(url,signal,after_fetch)
        return () => controller.abort();
    }, [escuela]);

    return programas.programas;
}