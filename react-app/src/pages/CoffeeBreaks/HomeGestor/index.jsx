import { useState, useEffect } from "react";

import ProximoServicio from "./components/ProximoServicio";
import BarDiasSemana from "./components/BarDiasSemana";
import Footer from "./components/Footer";

import { getAuth } from "../../../hooks/useAuth";

export default function HomeGestor() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAuth(setLoading);
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
