import ProximoServicio from "./components/ProximoServicio";
import BarDiasSemana from "./components/BarDiasSemana";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./components/Footer";
export default function HomeGestor() {
  const [loading, setLoading] = useState(true);
  const getAuth = async () => {
    const response = await axios
      .get("http://localhost:3900/api/user/auth", { withCredentials: true })
      .then((res) => {
        setLoading(false);
        return res;
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.location.href = "http://localhost:5173/login";
        }
      });
  };
  useEffect(() => {
    getAuth();
  }, []);
  return (
    <>
      <div className="w-11/12 m-auto md:flex md:w-full md:items-start h-screen">
        {loading ? (
          <div className="m-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        ) : (
          <>
            <ProximoServicio />
            <BarDiasSemana />
          </>
        )}
      </div>
      {loading ? null : <Footer />}
    </>
  );
}
