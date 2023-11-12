import { useState, useEffect } from 'react';
import {get_fetch}  from './get_fetch';


const url_backend  = import.meta.env.VITE_URL_API;

export const useSalones = () => {
    const [salones, setClases] = useState([]);

    const after_fetch = (data) => {
        setClases(data);
    }

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        get_fetch(url_backend+"/salones",signal,after_fetch)
        return () => controller.abort();
    }, []);

    return salones.salones;
}