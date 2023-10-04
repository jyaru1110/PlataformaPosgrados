import Header from "./componentes/header";
import Tabla from "./componentes/Tabla";
import { useProcesos } from "../../hooks/useProcesos";

export default function HomeSeguimiento() {
  const procesosResponse = useProcesos();
  const procesos = procesosResponse.procesos;
  const loading = procesosResponse.loading;
  return (
    <div>
      <Header titulo="Nuevos programas y actualizaciones"></Header>
      <Tabla loading ={loading} procesos={procesos}></Tabla>
    </div>
  );
}
