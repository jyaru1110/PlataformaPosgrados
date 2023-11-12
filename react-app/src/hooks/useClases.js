import { useState, useEffect } from 'react';
import {get_fetch}  from './get_fetch';
import {clases_to_correct_format} from '../utils/clases_to_correct_format';

const url_backend  = import.meta.env.VITE_URL_API;

export const useClases = () => {
    const [clases, setClases] = useState([]);

    const after_get_clases = (data) => {
        const data_processed = clases_to_correct_format(data.clases);
        setClases(data_processed);
    }

    const get_clases = async () => {
        const controller = new AbortController();
        const signal = controller.signal;
        await get_fetch(url_backend+"/clases",signal,after_get_clases);
        return () => controller.abort();
    }

    useEffect(() => {
        get_clases();
    }, []);

    return {clases:clases,setClases:setClases};
}