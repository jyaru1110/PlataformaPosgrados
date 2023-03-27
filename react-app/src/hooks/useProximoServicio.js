import { useState, useEffect } from 'react';
import {get_fetch}  from './get_fetch';
import { date_to_dd_month_yyyy } from '../utils/date_to_string';

const host_back  = "192.168.0.15";
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