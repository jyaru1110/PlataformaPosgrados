import { useState,useEffect } from "react";
import { get_fetch } from "./get_fetch";

const url_backend  = import.meta.env.VITE_URL_API;

export const usePersonas = () => {
    const [personas, setPersonas] = useState([]);
    const [loading, setLoading] = useState(true);

    const after_fetch = (data) => {
        setLoading(false);
        setPersonas(data);
    }

    const get_personas = async () => {
        const controller = new AbortController();
        const signal = controller.signal;
        setLoading(true);
        await get_fetch(url_backend+"/user/all",signal,after_fetch)
        return () => controller.abort();
    }

    useEffect(() => {
        get_personas();
    }, []);

    return {personas, loading};
}

export const usePersona = (id) => {
    const [persona, setPersona] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const after_fetch = (data) => {
        setLoading(false);
        setPersona(data);
    }

    const onError = (error) => {
        setLoading(false);
        setError(error);
    }

    const get_persona = async () => {
        const controller = new AbortController();
        const signal = controller.signal;
        setLoading(true);
        await get_fetch(url_backend+"/user/"+id,signal,after_fetch,{},onError)
        return () => controller.abort();
    }

    useEffect(() => {
        get_persona();
    }, []);

    return {persona, loading, error};
}