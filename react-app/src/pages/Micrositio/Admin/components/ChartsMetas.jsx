import { useMetasPeriodo } from "../../../../hooks/useMetasPeriodo";
import { usePieMetas } from "../../../../hooks/usePieMetas";
import { Doughnut, Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { useMetasEscuela } from "../../../../hooks/useMetasEscuela";
import Table from "../../components/Table";
import { usePeriodos } from "../../../../hooks/usePeriodos";

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
const headers_escuela = [
  "Periodo",
  "Escuela",
  "Meta Alumnos",
  "Inscritos",
  "Porcentaje",
];

export default function ChartsMetas(escuelas) {
  const { data, loading, error } = useMetasPeriodo(escuelas);
  const {
    loading: loadingMetasEscuelas,
    error: errorMetasEscuelas,
    data: dataMetasEscuelas,
  } = useMetasEscuela();
  const {
    periodos,
    loading: loadingPeriodos,
    error: errorPeriodos,
  } = usePeriodos();
  const [periodo, setPeriodo] = useState();
  const [periodoNombre, setPeriodoNombre] = useState();
  const { data_pie, loading_pie, error_pie } = usePieMetas({
    escuelas: escuelas,
    periodo: periodo ? periodo : 1,
  });

  const filterMetasEscuelas = (meta) => {
    return (
      (escuelas?.escuelas?.includes(meta.escuela) ||
        escuelas?.escuelas?.length === 0) &&
      meta.periodo_nombre === periodoNombre
    );
  };

  useEffect(() => {
    if (periodos.length > 0) {
      setPeriodo(periodos[0].id);
      setPeriodoNombre(periodos[0].periodo_nombre);
    }
  }, [periodos]);

  return (
    <div className="w-full bg-white px-7 py-3 rounded-xl shadow-sm mt-7">
      <div className="flex space-x-3">
        <h2 className="font-bold text-2xl">Metas</h2>
        <select
          className="w-32 border border-grayborder rounded-lg px-3 py-1"
          onChange={(e) => {
            setPeriodo(e.target.value);
            setPeriodoNombre(e.target.options[e.target.selectedIndex].text);
          }}
        >
          {periodos?.map((periodo) => {
            return (
              <option key={periodo.id} value={periodo.id}>
                {periodo.periodo_nombre}
              </option>
            );
          })}
        </select>
      </div>
      <article className="flex space-x-5">
        <div className="flex flex-col  p-4 rounded-xl border border-grayborder w-40 my-5">
          <span className="font-light">Metas en total</span>
          {loadingMetasEscuelas ? (
            <div className="w-32 rounded-md h-10 animate-pulse bg-slate-100"></div>
          ) : (
            <span className="font-bold text-3xl">
              {data_pie?.data
                ? parseInt(data_pie?.data?.datasets[0].data[0]) +
                  parseInt(data_pie?.data?.datasets[0].data[1])
                : 0}
            </span>
          )}
        </div>
        <div className="flex flex-col  p-4 rounded-xl border border-grayborder w-40 my-5">
          <span className="font-light">Inscripciones</span>
          {loadingMetasEscuelas ? (
            <div className="w-32 rounded-md h-10 animate-pulse bg-slate-100"></div>
          ) : (
            <span className="font-bold text-3xl">
              {data_pie?.data?.datasets[0].data[0]}
            </span>
          )}
        </div>
        <div className="flex flex-col  p-4 rounded-xl border border-grayborder w-40 my-5">
          <span className="font-light">Porcentaje</span>
          {loadingMetasEscuelas ? (
            <div className="w-32 rounded-md h-10 animate-pulse bg-slate-100"></div>
          ) : (
            <span className="font-bold text-3xl">
              {data_pie?.percentage?.toFixed(1)}%
            </span>
          )}
        </div>
      </article>
      <div className="flex w-full space-x-10">
        <div className="w-2/3">
          {!loading ? (
            <Bar data={data}></Bar>
          ) : (
            <div className="w-[700px] h-72 bg-slate-100 animate-pulse rounded-xl"></div>
          )}
        </div>
        <div className="w-1/3 flex flex-col items-end justify-between">
          <div className="flex-1 relative items-center flex">
            {!loading_pie ? (
              <>
                <Doughnut data={data_pie?.data}></Doughnut>{" "}
                <span className="absolute top-0 text-4xl w-full h-full flex items-center justify-center pointer-events-none">
                  <p className="mt-8 font-semibold text-primary">
                    %{data_pie?.percentage?.toFixed(1)}
                  </p>
                </span>
              </>
            ) : (
              <div className="w-72 h-72 bg-slate-100 animate-pulse rounded-xl"></div>
            )}
          </div>
        </div>
      </div>
      <h2 className="ml-2 font-bold text-2xl my-5">Metas por escuela</h2>
      <Table headers={headers_escuela} loading={loading}>
        {dataMetasEscuelas?.filter(filterMetasEscuelas).map((meta, index) => {
          return (
            <tr
              className="border-b border-grayborder hover:bg-grayborder cursor-pointer transition-all ease-in-out duration-300"
              key={index}
            >
              <td className="px-2 py-1">{meta?.periodo_nombre}</td>
              <td className="px-2 py-1">{meta?.escuela}</td>
              <td className="px-2 py-1">{meta?.total_meta_inscripciones}</td>
              <td className="px-2 py-1">{meta?.num_inscripciones}</td>
              <td className="px-2 py-1">
                {meta.num_inscripciones > 0 && meta.total_meta_inscripciones > 0
                  ? (
                      (meta?.num_inscripciones /
                        meta?.total_meta_inscripciones) *
                      100
                    )?.toFixed(0)
                  : 0}
                %
              </td>
            </tr>
          );
        })}
      </Table>
    </div>
  );
}
