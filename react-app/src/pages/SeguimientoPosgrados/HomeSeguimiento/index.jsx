import Header from "../componentes/Header";
import Tabla from "./componentes/Tabla";
import NuevoForm from "./componentes/NuevoForm";
import { useProcesos } from "../../../hooks/useProcesos";
import { useState } from "react";

export default function HomeSeguimiento() {
  const procesosResponse = useProcesos();
  const procesos = procesosResponse.procesos;
  const loading = procesosResponse.loading;
  const [showNewForm, setShowNewForm] = useState(false);
  return (
    <div className="flex flex-col h-[calc(100dvh)] items-center">
      <NuevoForm show={showNewForm} setShow={setShowNewForm}></NuevoForm>
      <Header titulo="Nuevos programas y actualizaciones"></Header>
      <div className="w-11/12 flex flex-col">
        <h1 className="font-seravek text-primary self-start font-semibold text-xl mt-10">
          Posgrados
        </h1>
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
