import { useMetasPeriodo } from "../../../../hooks/useMetasPeriodo";
import { usePieMetas } from "../../../../hooks/usePieMetas";
import { Doughnut, Bar } from "react-chartjs-2";
import { useState } from "react";

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

export default function ChartsMetas(escuelas) {
  const { data, loading, error } = useMetasPeriodo(escuelas);
  const [periodo, setPeriodo] = useState(1);
  const { data_pie, loading_pie, error_pie } = usePieMetas({
    escuelas: escuelas,
    periodo: periodo,
  });
  return (
    <div>
      <h2>Charts Metas</h2>
      {!loading && <Bar data={data}></Bar>}
      <select
        className="w-40 mt-12"
        onChange={(e) => {
          setPeriodo(e.target.value);
        }}
      >
        <option value="1">2023-2024</option>
        <option value="2">2021-2022</option>
        <option value="3">2022-2023</option>
        <option value="4">2024-2025</option>
        <option value="5">2025-2026</option>
      </select>
      {!loading_pie && (
        <div className="w-80">
          <Doughnut data={data_pie}></Doughnut>
        </div>
      )}
    </div>
  );
}
