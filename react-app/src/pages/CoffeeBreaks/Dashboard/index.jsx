import Header from "../../../components/Header";
import Fechas from "../../../components/form/Fechas";
import { useServiciosImpuntuales } from "../../../hooks/useServiciosImpuntuales";
import { useProgramasServiciosImpuntuales } from "../../../hooks/useProgramasServiciosImpuntuales";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

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

  return (
    <div className="font-poppins p-7">
      <Header titulo="Dashboard"></Header>
      <Fechas></Fechas>
      <div className="w-full flex justify-between p-5 rounded-2xl bg-primarylight shadow-lg">
        <div className="w-80">
          {loading_impuntuales ? (
            "Cargando..."
          ) : (
            <Pie data={servicios_impuntuales} />
          )}
        </div>
        <div className="w-80">
          {loading_programas_impuntuales ? (
            "Cargando..."
          ) : (
            <Pie data={programas_impuntuales} />
          )}
        </div>
      </div>
    </div>
  );
}
