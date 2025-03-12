import { useEffect, useState } from "react";
import { get_fetch } from "./get_fetch";

const url_backend = import.meta.env.VITE_URL_API;

export const useProyectos = (query) => {
    const [proyectos,setProyectos] = useState([])
    const [loading,setLoading] = useState(true)

    const afterFetch = (data) => {
        setProyectos(data);
        setLoading(false);
    }


    useEffect(()=>{
        const controller = new AbortController();
        const signal = controller.signal;
        get_fetch(url_backend+"/proyectos?query="+query,signal,afterFetch)
        return () => controller.abort();
    },[query])


    return {loading,proyectos}
};

export const usePromocionProyectos = () => {
    const [proyectos,setProyectos] = useState([])
    const [loading,setLoading] = useState(true)

    const afterFetch = (data) => {
        setProyectos(data);
        setLoading(false);
    }

    useEffect(()=>{
        const controller = new AbortController();
        const signal = controller.signal;
        get_fetch(url_backend+"/promocion/proyectos",signal,afterFetch)
        return () => controller.abort();
    },[])

    return {loading,proyectos}

}

export const useProyecto = (id) => {
    const [proyecto, setProyecto] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState()

    const afterFetch = (data) => {
        setProyecto(data)
        setLoading(false)
    }

    const afterError = (error) => {
        setError(error)
        setLoading(false)
    }

    useEffect(()=>{
        const controller = new AbortController();
        const signal = controller.signal;
        get_fetch(url_backend+"/proyecto/"+id,signal,afterFetch,{},afterError)
        return () => controller.abort()
    },[id])

    return {loading, proyecto, error, setProyecto}
}