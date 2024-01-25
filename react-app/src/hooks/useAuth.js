import { get_fetch } from "./get_fetch";
const url_backend = import.meta.env.VITE_URL_API;

export const getAuth = async (setLoading) => {
  const controller = new AbortController();
  const signal = controller.signal;
  await get_fetch(url_backend + "/user/auth", signal, () => {
    localStorage.setItem("id", res.data.id);
    localStorage.setItem("rol", res.data.rol);
    localStorage.setItem("nombre", res.data.nombre);
    localStorage.setItem("escuela", res.data.escuela);
    localStorage.setItem("email", res.data.email);
    localStorage.setItem("area", res.data.area);
    setLoading(false);
    return res;
  });
};
