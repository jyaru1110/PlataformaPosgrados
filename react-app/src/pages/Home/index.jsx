import axios from "axios";
import { useEffect, useState } from "react";

const url_backend = import.meta.env.VITE_URL_API;

export default function Home() {
  const [loading, setLoading] = useState(true);
  const getAuth = async () => {
    const response = await axios
      .get(url_backend + "/user/auth", { withCredentials: true })
      .then((res) => {
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("rol", res.data.rol);
        localStorage.setItem("nombre", res.data.nombre);
        localStorage.setItem("escuela", res.data.escuela);
        localStorage.setItem("email", res.data.email);
        setLoading(false);
        return res;
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.location.href = "/login";
        }
      });
  };
  useEffect(() => {
    getAuth();
  }, []);
  return (
    <div className="flex flex-col items-center h-screen w-screen bg-primary justify-center">
      {loading ? (
        <div className="m-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-white"></div>
      ) : (
        <>
          <h1 className="text-white text-lg font-serif text-center">
            Bienvenido a posgrados de la Universidad Panamericana
          </h1>
          <a
            href="/home-coffee-breaks"
            className="flex justify-center items-center w-[245px] h-[36px] bg-secondary text-white text-sm rounded-[18px] mt-4"
          >
            Plataforma Coffee Breaks
          </a>
          <a
            href="/home-seguimiento"
            className="flex justify-center items-center w-[245px] h-[36px] bg-secondary text-white text-sm rounded-[18px] mt-4"
          >
            Seguimiento posgrados
          </a>
        </>
      )}
    </div>
  );
}
