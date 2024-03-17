import { get_fetch } from "./get_fetch";
const url_backend = import.meta.env.VITE_URL_API;

export const getAuth = async (setLoading) => {
  const controller = new AbortController();
  const signal = controller.signal;
  await get_fetch(url_backend + "/user/auth", signal, (res) => {
    localStorage.setItem("id", res.id);
    localStorage.setItem("rol", res.rol);
    localStorage.setItem("nombre", res.nombre);
    localStorage.setItem("escuela", res.escuela);
    localStorage.setItem("email", res.email);
    localStorage.setItem("area", res.area);
    localStorage.setItem("foto", res.foto);
    setLoading(false);
  });
};
