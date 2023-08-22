import { useEffect, useState } from "react";
import axios from "axios";
const url_backend = import.meta.env.VITE_URL_API;

export default function LandingPage() {
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
    loading?(
        <div className="m-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
    ):
    <div className="flex flex-col items-center">
      <h1 className="font-poppins mb-5 mt-5 text-center">
        Bienvenido a Posgrados de la Universidad Panamericana
      </h1>
      <a
        href="/home-coffee-breaks"
        className="font-poppins rounded-xl bg-primary p-2 text-white"
      >
        Plataforma de Coffee Breaks
      </a>
    </div>
  );
}
