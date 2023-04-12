import { useState, useEffect } from 'react';
import {get_fetch}  from './get_fetch';

const url_backend  = import.meta.env.VITE_URL_API;

export const useClases = () => {
    const [clases, setClases] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        get_fetch(url_backend+"/clases",signal,setClases)
        return () => controller.abort();
    }, []);

    return clases.clases;
}