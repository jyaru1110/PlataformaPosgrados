import { useState, useEffect } from 'react';
import {get_fetch}  from './get_fetch';

const host_back  = "192.168.0.15";
const port = "3900";

export const useSalones = () => {
    const [salones, setClases] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        get_fetch("http://"+host_back+":"+port+"/api/salones",signal,setClases)
        return () => controller.abort();
    }, []);

    return salones.salones;
}