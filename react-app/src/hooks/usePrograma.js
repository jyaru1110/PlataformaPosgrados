import { useState, useEffect } from 'react';
import {get_fetch}  from './get_fetch';

const host_back  = "192.168.0.5";
const port = "3900";

export const useProximoServicio = (props) => {
    const [servicio, setServicio] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        get_fetch("http://"+host_back+":"+port+"/api/proximo_servicio",signal,setServicio)
        return () => controller.abort();
    }, []);

    return servicio[0];
}