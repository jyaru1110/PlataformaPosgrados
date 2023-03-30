import { useState, useEffect } from 'react';
import {get_fetch}  from './get_fetch';

const host_back  = "localhost";
const port = "3900";

export const useProximoServicio = () => {
    const [servicio, setServicio] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        get_fetch("http://"+host_back+":"+port+"/api/proximo_servicio",signal,setServicio)
        return () => controller.abort();
    }, []);

    return servicio[0];
}