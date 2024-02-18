import Header from "../../../components/Header";
import Fechas from "../../../components/form/Fechas";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
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
};

export default function Dashboard() {
  return (
    <div className="font-poppins p-7">
      <Header titulo="Dashboard"></Header>
      <Fechas></Fechas>
      <div className="w-full flex justify-between p-5 rounded-2xl bg-primarylight shadow-lg">
        <div className="w-80">    
          <Pie
            data={data}
          />
        </div>
        <div className="w-80">
          <Pie data={data} />
        </div>
        <div className="w-80">
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
}
