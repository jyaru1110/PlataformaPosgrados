import { useEffect, useState } from "react";
import axios from "axios";

const url_backend = import.meta.env.VITE_URL_API;

export default function Login() {
  const [loading, setLoading] = useState(true);

  const googleAuth = () => {
    window.location.href = url_backend + "/login/google";
  };

  const getAuth = async () => {
    const response = await axios
      .get(url_backend + "/user/auth", { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          window.location.href = "/home";
        }
        return res;
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <div className="w-full ">
      {loading ? (
        <div className="m-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      ) : (
        <div className="flex items-center flex-col rounded-lg border-">
          <h1 className="text-xl font-semibold font-poppins text-center mb-4 mt-10">
            Inicia sesión con tu cuenta de la Universidad Panamericana
          </h1>
          <button onClick={googleAuth}>Inicia sesión con google</button>
        </div>
      )}
    </div>
  );
}
