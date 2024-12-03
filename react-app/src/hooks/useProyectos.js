import { useEffect, useState } from "react";
import { get_fetch } from "./get_fetch";

const url_backend = import.meta.env.VITE_URL_API;

export const useProyectos = () => {
    const [proyectos,setProyectos] = useState([])
    const [loading,setLoading] = useState(true)

    const afterFetch = (data) => {
        setProyectos(data);
        setLoading(false);
    }


    useEffect(()=>{
        const controller = new AbortController();
        const signal = controller.signal;
        get_fetch(url_backend+"/proyectos",signal,afterFetch)
        return () => controller.abort();
    },[])


    return {loading,proyectos}
};
