import Header from "../../../components/Header";
import Fechas from "../../../components/form/Fechas";
import { useState, useEffect } from "react";
import { useServiciosImpuntuales } from "../../../hooks/useServiciosImpuntuales";
import { useProgramasServiciosImpuntuales } from "../../../hooks/useProgramasServiciosImpuntuales";
import { useSolicitudesScatter } from "../../../hooks/useSolicitudesScatter";
import { useServiciosCancelados } from "../../../hooks/useServiciosCancelados";
import { Pie, Scatter } from "react-chartjs-2";
import MultiselectPrograma from "./Components/MultiselectProgram";
import {
  Chart as ChartJS,
  ArcElement,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [escuelas, setEscuelas] = useState([
    "Gobierno y Economía",
    "Bellas Artes",
    "Derecho",
    "Empresariales",
    "ESDAI",
    "Filosofía",
    "Ingeniería",
    "Comunicación",
    "Pedagogía",
    "Empresariales Santa Fe",
    "Educación Continua",
  ]);

  const { servicios_impuntuales, loading_impuntuales } =
    useServiciosImpuntuales({
      fecha_inicio: "2024-02-12",
      fecha_fin: "2024-02-17",
      escuelas: escuelas,
    });

  const { programas_impuntuales, loading_programas_impuntuales } =
    useProgramasServiciosImpuntuales({
      fecha_inicio: "2024-02-12",
      fecha_fin: "2024-02-17",
      escuelas: escuelas,
    });

  const { servicios_cancelados, loading_servicios_cancelados } =
    useServiciosCancelados({
      fecha_inicio: "2024-02-12",
      fecha_fin: "2024-02-17",
      escuelas: escuelas,
    });

  const onChangePrograma = (array) => {
    setEscuelas(array.map((item) => item.label));
  };

  return (
    <div className="font-poppins p-7">
      <Header titulo="Dashboard"></Header>
      <MultiselectPrograma onChange={onChangePrograma}></MultiselectPrograma>
      <Fechas></Fechas>
      <div className="w-full flex flex-wrap justify-between p-5 rounded-2xl bg-primarylight shadow-lg">
        <div className="w-80">
          <p className="text-center font-bold">SERVICIOS CONFIRMADOS</p>
          {loading_impuntuales ? (
            "Cargando..."
          ) : (
            <Pie data={servicios_impuntuales} />
          )}
        </div>
        <div className="w-80">
          <p className="text-center font-bold">NUEVOS SERVICIOS SOLICITADOS</p>
          {loading_programas_impuntuales ? (
            "Cargando..."
          ) : (
            <Pie data={programas_impuntuales} />
          )}
        </div>
        <div className="w-80">
          <p className="text-center font-bold">SERVICIOS CANCELADOS</p>
          {loading_servicios_cancelados ? (
            "Cargando..."
          ) : (
            <Pie data={servicios_cancelados} />
          )}
        </div>
      </div>
    </div>
  );
}
