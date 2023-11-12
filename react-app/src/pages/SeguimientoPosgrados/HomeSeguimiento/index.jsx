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
    <div>
      <NuevoForm show={showNewForm} setShow={setShowNewForm}></NuevoForm>
      <Header titulo="Nuevos programas y actualizaciones"></Header>
      <Tabla loading={loading} procesos={procesos} setShow={setShowNewForm}></Tabla>
    </div>
  );
}
