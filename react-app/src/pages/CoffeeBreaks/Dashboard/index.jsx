import Header from "../../../components/Header";
import Fechas from "../../../components/form/Fechas";
import { useState, useEffect } from "react";
import { useServiciosImpuntuales } from "../../../hooks/useServiciosImpuntuales";
import { useProgramasServiciosImpuntuales } from "../../../hooks/useProgramasServiciosImpuntuales";
import { useServiciosAprobados } from "../../../hooks/useServiciosAprobados";
import { useServiciosCancelados } from "../../../hooks/useServiciosCancelados";
import { useNivelImpuntualidad } from "../../../hooks/useNivelImpuntualidad";
import { Pie, Bar } from "react-chartjs-2";
import MultiselectPrograma from "./Components/MultiselectProgram";
import {
  Chart as ChartJS,
  ArcElement,
  LinearScale,
  PointElement,
  LineElement,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  CategoryScale,
  BarElement,
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

  const { data_nivel_impuntualidad, loading_nivel_impuntualidad } =
    useNivelImpuntualidad({
      fecha_inicio: "2024-02-12",
      fecha_fin: "2024-02-17",
      escuelas: escuelas,
    });

  const { servicios_impuntuales, loading_impuntuales } =
    useServiciosImpuntuales({
      fecha_inicio: "2024-02-12",
      fecha_fin: "2024-02-17",
      escuelas: escuelas,
    });

  const { servicios_aprobados, loading_aprobados } = useServiciosAprobados({
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
          <p className="text-center font-bold">SERVICIOS SOLICITADOS</p>
          {loading_impuntuales ? (
            "Cargando..."
          ) : (
            <Pie data={servicios_impuntuales} />
          )}
        </div>
        <div className="w-80">
          <p className="text-center font-bold">SERVICIOS IMPUNTUALES</p>
          {loading_programas_impuntuales ? (
            "Cargando..."
          ) : (
            <Pie data={programas_impuntuales} />
          )}
        </div>
        <div className="w-80">
          <p className="text-center font-bold">SERVICIOS CONFIRMADOS</p>
          {loading_aprobados ? (
            "Cargando..."
          ) : (
            <Pie data={servicios_aprobados} />
          )}
        </div>
        <div className="w-80">
          <p className="text-center font-bold">SERVICIOS SOLICITADOS</p>
          {loading_servicios_cancelados ? (
            "Cargando..."
          ) : (
            <Pie data={servicios_cancelados} />
          )}
        </div>
      </div>
      {loading_nivel_impuntualidad ? (
        "Cargando..."
      ) : (
        <div className="w-full p-7">
          <p className="text-center font-bold">NIVEL DE IMPUNTUALIDAD EN SOLICITUDES</p>
          <Bar data={data_nivel_impuntualidad} />
        </div>
      )}
    </div>
  );
}
