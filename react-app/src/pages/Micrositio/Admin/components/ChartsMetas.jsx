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
    <div className="w-full bg-white px-7 py-3 rounded-xl shadow-sm mt-7">
      <h2 className="font-bold text-2xl">Metas</h2>
      <div className="flex w-full space-x-10">
        <div className="w-2/3">{!loading && <Bar data={data}></Bar>}</div>
        <div className="w-1/3 flex flex-col items-end justify-between">
          <select
            className="w-32 border border-grayborder rounded-lg px-3 py-1"
            onChange={(e) => {
              setPeriodo(e.target.value);
            }}
          >
            <option value="1">2023-2024</option>
            <option value="3">2022-2023</option>
            <option value="4">2024-2025</option>
            <option value="5">2025-2026</option>
          </select>
          <div className="flex-1 relative items-center flex">
            {!loading_pie && (
              <>
                <Doughnut data={data_pie?.data}></Doughnut>{" "}
                <span className="absolute top-0 text-4xl w-full h-full flex items-center justify-center pointer-events-none">
                  <p className="mt-8 font-semibold text-primary">%{data_pie?.percentage?.toFixed(1)}</p>
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
