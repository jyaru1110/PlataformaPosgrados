import { get_fetch } from "./get_fetch";
import { useEffect, useState} from "react";

const url_backend = import.meta.env.VITE_URL_API;

export const useSeccionesPromocion = () => {
    const [secciones, setSecciones] = useState([]);
    const [loading, setLoading] = useState(true);

    const after_fetch = (data) => {
        setSecciones(data);
        setLoading(false);
    };

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        get_fetch(url_backend + "/promocion/secciones", signal, after_fetch);
        return () => controller.abort();
    }, []);

    return {secciones,loading};
}