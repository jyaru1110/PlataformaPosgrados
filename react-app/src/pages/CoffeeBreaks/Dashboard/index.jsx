import Header from "../../../components/Header";
import Fechas from "../../../components/form/Fechas";
import { useState } from "react";
import { useServiciosImpuntuales } from "../../../hooks/useServiciosImpuntuales";
import { useProgramasServiciosImpuntuales } from "../../../hooks/useProgramasServiciosImpuntuales";
import { useServiciosAprobados } from "../../../hooks/useServiciosAprobados";
import { useServiciosCancelados } from "../../../hooks/useServiciosCancelados";
import { useNivelImpuntualidad } from "../../../hooks/useNivelImpuntualidad";
import { useSearchParams } from "react-router-dom";
import { getSemanaPasada } from "../../../utils/get_dias_semana";
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const rol = localStorage.getItem("rol");

  const options_bar = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Tiempo antes del servicio",
        },
      },
      y: {
        title: {
          display: true,
          text: "Número de servicios",
        },
      },
    },
  };

  const { lunes, sabado } = getSemanaPasada();

  const fecha_inicio = searchParams.get("fecha_inicio") || lunes;
  const fecha_fin = searchParams.get("fecha_fin") || sabado;

  const [escuelas, setEscuelas] = useState(
    rol == "Gestor"
      ? [
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
        ]
      : [localStorage.getItem("escuela")]
  );

  const {
    data_nivel_impuntualidad,
    loading_nivel_impuntualidad,
    error_nivel_impuntualidad,
  } = useNivelImpuntualidad({
    fecha_inicio: fecha_inicio,
    fecha_fin: fecha_fin,
    escuelas: escuelas,
  });

  const { servicios_impuntuales, loading_impuntuales, error_impuntuales } =
    useServiciosImpuntuales({
      fecha_inicio: fecha_inicio,
      fecha_fin: fecha_fin,
      escuelas: escuelas,
    });

  const { servicios_aprobados, loading_aprobados, error_aprobados } =
    useServiciosAprobados({
      fecha_inicio: fecha_inicio,
      fecha_fin: fecha_fin,
      escuelas: escuelas,
    });

  const { programas_impuntuales, loading_programas_impuntuales } =
    useProgramasServiciosImpuntuales({
      fecha_inicio: fecha_inicio,
      fecha_fin: fecha_fin,
    });

  const {
    servicios_cancelados,
    loading_servicios_cancelados,
    error_servicios_cancelados,
  } = useServiciosCancelados({
    fecha_inicio: fecha_inicio,
    fecha_fin: fecha_fin,
    escuelas: escuelas,
  });

  const onChangePrograma = (array) => {
    setEscuelas(array.map((item) => item.label));
  };

  if (localStorage.getItem("rol") !== "Gestor") {
    return (
      <div className="font-poppins p-7">
        <Header titulo="Dashboard"></Header>
        <Fechas
          value_inicio={fecha_inicio}
          value_fin={fecha_fin}
          setFechaInicio={(fecha_inicio_value) => {
            searchParams.set("fecha_inicio", fecha_inicio_value);
            setSearchParams(searchParams);
          }}
          setFechaFin={(fecha_fin_value) => {
            searchParams.set("fecha_fin", fecha_fin_value);
            setSearchParams(searchParams);
          }}
        ></Fechas>
        <div className="w-full flex flex-wrap justify-between p-5 rounded-2xl bg-primarylight shadow-lg">
          <div className="w-80">
            <p className="text-center font-bold">SERVICIOS SOLICITADOS</p>
            {loading_impuntuales || error_impuntuales ? (
              "Cargando..."
            ) : (
              <Pie data={servicios_impuntuales} />
            )}
          </div>
          <div className="w-80">
            <p className="text-center font-bold">SERVICIOS CONFIRMADOS</p>
            {loading_aprobados || error_aprobados ? (
              "Cargando..."
            ) : (
              <Pie data={servicios_aprobados} />
            )}
          </div>
          <div className="w-80">
            <p className="text-center font-bold">SERVICIOS SOLICITADOS</p>
            {loading_servicios_cancelados || error_servicios_cancelados ? (
              "Cargando..."
            ) : (
              <Pie data={servicios_cancelados} />
            )}
          </div>
        </div>
        {loading_nivel_impuntualidad || error_nivel_impuntualidad ? (
          "Cargando..."
        ) : (
          <div className="w-full p-7">
            <p className="text-center font-bold">SOLICITUDES</p>
            <Bar data={data_nivel_impuntualidad} options={options_bar} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="font-poppins p-7">
      <Header titulo="Dashboard"></Header>
      <MultiselectPrograma onChange={onChangePrograma}></MultiselectPrograma>
      <Fechas
        value_inicio={fecha_inicio}
        value_fin={fecha_fin}
        setFechaInicio={(fecha_inicio_value) => {
          searchParams.set("fecha_inicio", fecha_inicio_value);
          setSearchParams(searchParams);
        }}
        setFechaFin={(fecha_fin_value) => {
          searchParams.set("fecha_fin", fecha_fin_value);
          setSearchParams(searchParams);
        }}
      ></Fechas>
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
          <p className="text-center font-bold">SOLICITUDES</p>
          <Bar data={data_nivel_impuntualidad} options={options_bar} />
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
