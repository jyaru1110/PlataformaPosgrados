import Header from "../componentes/Header";
import Tabla from "./componentes/Tabla";
import NuevoForm from "./componentes/NuevoForm";
import { useProcesos } from "../../../hooks/useProcesos";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const url_backend = import.meta.env.VITE_URL_API;

export default function HomeSeguimiento() {
  const procesosResponse = useProcesos();
  const procesos = procesosResponse.procesos;
  const loading = procesosResponse.loading;
  const [metricas, setMetricas] = useState([]);
  const [showNewForm, setShowNewForm] = useState(false);
  useEffect(() => {
    axios
      .get(url_backend + "/procesos/metricas", { withCredentials: true })
      .then((res) => {
        setMetricas(res.data);
        console.log(res.data);
      })
      .catch((err) => {});
  }, []);
  return (
    <div className="flex flex-col h-[calc(100dvh)] items-center font-seravek">
      <NuevoForm show={showNewForm} setShow={setShowNewForm}></NuevoForm>
      <Header titulo="Nuevos programas y actualizaciones"></Header>
      <div className="w-11/12 flex flex-col">
        <h1 className="font-seravek text-primary self-start font-semibold text-xl mt-10">
          Posgrados
        </h1>
        <section className="flex space-x-2 mt-2">
          <span className="bg-complete text-white px-5 py-2 rounded-2xl">
            <p>Programas en total</p>
            <p className="text-3xl font-bold text-center">{metricas.total}</p>
          </span>
          <span className="bg-badge-1 text-white px-5 py-2 rounded-2xl">
            <p>Programas completados</p>
            <p className="text-3xl font-bold text-center">{metricas.completados}</p>
          </span>
          <span className="bg-badge-2 text-white px-5 py-2 rounded-2xl">
            <p>Nuevos programas</p>
            <p className="text-3xl font-bold text-center">{metricas.nuevos}</p>
          </span>
          <span className="bg-badge-3 text-white px-5 py-2 rounded-2xl">
            <p>Actualizaciones</p>
            <p className="text-3xl font-bold text-center">{metricas.actualizaciones}</p>
          </span>
        </section>
        <button
          className="self-end py-2 px-10 rounded-md text-sm font-seravek font-medium bg-primary text-white"
          onClick={() => setShowNewForm(true)}
        >
          NUEVO PROCESO
        </button>
      </div>
      <Tabla
        loading={loading}
        procesos={procesos}
        setProcesos={procesosResponse.setProcesos}
      ></Tabla>
    </div>
  );
}
