import { useEffect, useState } from "react";
import { getAuth } from "../../hooks/useAuth";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAuth(setLoading);
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
          {localStorage.getItem("id") == 184 ||
          localStorage.getItem("id") == 183 ||
          localStorage.getItem("id") == 198 ? (
            <a
              href="/seguimientoposgrados"
              className="flex justify-center items-center w-[245px] h-[36px] bg-secondary text-white text-sm rounded-[18px] mt-4"
            >
              Seguimiento posgrados
            </a>
          ) : null}
        </>
      )}
    </div>
  );
}
