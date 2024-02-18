import Header from "../../../components/Header";
import Fechas from "../../../components/form/Fechas";
import { useServiciosImpuntuales } from "../../../hooks/useServiciosImpuntuales";
import { useProgramasServiciosImpuntuales } from "../../../hooks/useProgramasServiciosImpuntuales";
import { useSolicitudesScatter } from "../../../hooks/useSolicitudesScatter";
import { useServiciosCancelados } from "../../../hooks/useServiciosCancelados";
import { Pie, Scatter } from "react-chartjs-2";
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

/*const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};*/

export default function Dashboard() {
  const { servicios_impuntuales, loading_impuntuales } =
    useServiciosImpuntuales({
      fecha_inicio: "2024-02-12",
      fecha_fin: "2024-02-17",
    });

  const { programas_impuntuales, loading_programas_impuntuales } =
    useProgramasServiciosImpuntuales({
      fecha_inicio: "2024-02-12",
      fecha_fin: "2024-02-17",
    });

  const { scatter_solicitudes, loading_scatter_solicitudes } =
    useSolicitudesScatter({
      fecha_inicio: "2024-02-12",
      fecha_fin: "2024-02-17",
    });

  const { servicios_cancelados, loading_servicios_cancelados } =
    useServiciosCancelados({
      fecha_inicio: "2024-02-12",
      fecha_fin: "2024-02-17",
    });

  return (
    <div className="font-poppins p-7">
      <Header titulo="Dashboard"></Header>
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
          <p className="text-center font-bold">SERVICIOS CANCELADOS</p>
          {loading_servicios_cancelados ? (
            "Cargando..."
          ) : (
            <Pie data={servicios_cancelados} />
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
      </div>
      <div className="w-full mt-5">
        <p className="text-center font-bold">SOLICITUDES</p>
        {loading_scatter_solicitudes ? (
          "Cargando..."
        ) : (
          <Scatter data={scatter_solicitudes} />
        )}
      </div>
    </div>
  );
}
