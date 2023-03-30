import { useState, useEffect } from 'react';
import {get_fetch}  from './get_fetch';

const host_back  = "localhost";
const port = "3900";

export const useSalones = () => {
    const [salones, setClases] = useState([]);

    const after_fetch = (data) => {
        setClases(data);
    }

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        get_fetch("http://"+host_back+":"+port+"/api/salones",signal,after_fetch)
        return () => controller.abort();
    }, []);

    return salones.salones;
}