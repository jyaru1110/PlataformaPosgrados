import { useEffect, useState } from "react";
import { diff_dates_in_months } from "../../../../utils/date_to_string";
import ProgressCircle from "./ProgressCircle";
import ProgressStatus from "./ProgressStatus";
import axios from "axios";
import SideTab from "./SideTab";
const url_api = import.meta.env.VITE_URL_API;

export default function Tabla(props) {
  const procesos = props.procesos;
  const loading = props.loading;
  const [procesoSide, setProcesoSide] = useState(null);
  const [sumaEtapas, setSumaEtapas] = useState({});

  const onDateChange = (e, id) => {
    const data = {
      [e.target.id]: e.target.value,
    };
    const getData = setTimeout(() => {
      axios
        .patch(url_api + "/proceso/" + id, data, { withCredentials: true })
        .then((res) => {
          props.setProcesos((prev) => {
            return prev.map((proceso) => {
              if (proceso.id == res.data.proceso[1][0].id) {
                res.data.proceso[1][0].programa = proceso.programa;
                res.data.proceso[1][0].etapaProcesos = proceso.etapaProcesos;
                return res.data.proceso[1][0];
              } else {
                return proceso;
              }
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }, 2000);

    return () => {
      clearTimeout(getData);
    };
  };

  const onClick = (proceso) => {
    setProcesoSide(proceso);
  };

  useEffect(() => {
    setSumaEtapas({});
    procesos?.forEach((proceso) => {
      proceso.etapaProcesos.forEach((etapa) => {
        if (etapa.porcentaje <= 99 && etapa.porcentaje > 0) {
          setSumaEtapas((prev) => {
            return {
              ...prev,
              [etapa.etapa.numero]: prev[etapa.etapa.numero]
                ? prev[etapa.etapa.numero] + 1
                : 1,
            };
          });
        }
      });
    });
  }, [procesos]);

  return (
    <div className="w-11/12 flex flex-col items-start flex-1 overflow-auto mt-5">
      <SideTab
        proceso={procesoSide}
        setProcesos={props.setProcesos}
        setProceso={setProcesoSide}
      ></SideTab>
      <table className="font-seravek font-light text-sm w-full">
        <thead>
          <tr className="bg-secondary text-white text-center space-x-5">
            <td className="py-3 pl-1 text-left">Nombre del programa</td>
            <td className="items-start">Siglas</td>
            <td>Campus</td>
            <td>Escuela</td>
            <td>Tipo</td>
            <td className="w-36">Modalidad</td>
            <td>Duración</td>
            <td>
              <p>Etapa 1</p>
              <p className="text-xs">{sumaEtapas[1] ? sumaEtapas[1] : 0}</p>
            </td>
            <td>
              <p>Etapa 2</p>
              <p className="text-xs">{sumaEtapas[2] ? sumaEtapas[2] : 0}</p>
            </td>
            <td>
              <p>Etapa 3</p>
              <p className="text-xs">{sumaEtapas[3] ? sumaEtapas[3] : 0}</p>
            </td>
            <td>
              <p>Etapa 4</p>
              <p className="text-xs">{sumaEtapas[4] ? sumaEtapas[4] : 0}</p>
            </td>
            <td>
              <p>Etapa 5</p>
              <p className="text-xs">{sumaEtapas[5] ? sumaEtapas[5] : 0}</p>
            </td>
            <td>
              <p>Etapa 6</p>
              <p className="text-xs">{sumaEtapas[6] ? sumaEtapas[6] : 0}</p>
            </td>
            <td>Estatus</td>
            <td>Inicio trámite</td>
            <td>Aprobación SEP</td>
            <td>Próxima actualización</td>
          </tr>
        </thead>
        <tbody>
          {loading ? null : (
            <>
              {procesos?.length > 0
                ? procesos.map((proceso) => {
                    return (
                      <tr
                        className="border-b border-secondary hover:bg-gray-100"
                        key={proceso.id}
                      >
                        <td
                          className="py-3 w-60 leading-tight cursor-pointer"
                          onClick={() => onClick(proceso)}
                        >
                          {proceso.programa.programa}
                        </td>
                        <td className="text-center w-20">
                          {proceso.programa.codigo}
                        </td>
                        <td className="text-center w-20">
                          {proceso.programa.campus}
                        </td>
                        <td className="text-center w-28">
                          {proceso.programa.escuela}
                        </td>
                        <td className="text-center w-24">{proceso.tipo}</td>
                        <td className="text-center w-24">
                          {proceso.programa.modalidad}
                        </td>
                        <td className="text-center w-16">
                          {proceso.programa.duracion} meses
                        </td>
                        <td className="w-[70px]">
                          <ProgressCircle
                            porcentaje={proceso.etapaProcesos[0].porcentaje}
                          />
                        </td>
                        <td className="w-[70px]">
                          <ProgressCircle
                            porcentaje={proceso.etapaProcesos[1].porcentaje}
                          />
                        </td>
                        <td className="w-[70px]">
                          <ProgressCircle
                            porcentaje={proceso.etapaProcesos[2].porcentaje}
                          />
                        </td>
                        <td className="w-[70px]">
                          <ProgressCircle
                            porcentaje={proceso.etapaProcesos[3].porcentaje}
                          />
                        </td>
                        <td className="w-[70px]">
                          <ProgressCircle
                            porcentaje={proceso.etapaProcesos[4].porcentaje}
                          />
                        </td>
                        <td className="w-[70px] text-center">
                          {proceso.tipo == "Nuevo" ? (
                            <ProgressCircle
                              porcentaje={proceso.etapaProcesos[5].porcentaje}
                            />
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td className="w-[70px]">
                          <ProgressStatus
                            porcentaje={proceso.porcentaje}
                            fecha_proxima_actualizacion={
                              proceso.fecha_proxima_actualizacion
                            }
                          />
                        </td>
                        <td className="text-center px-2">
                          <input
                            type="date"
                            id="fecha_inicio_sep"
                            defaultValue={proceso.fecha_inicio_sep?.substring(
                              0,
                              10
                            )}
                            onChange={(e) => onDateChange(e, proceso.id)}
                          ></input>
                        </td>
                        <td className="text-center px-2">
                          <input
                            type="date"
                            id="fecha_aprobacion"
                            className="appearance-none"
                            defaultValue={proceso.fecha_aprobacion?.substring(
                              0,
                              10
                            )}
                            onChange={(e) => onDateChange(e, proceso.id)}
                          ></input>
                        </td>
                        <td
                          className={`text-center px-2 ${
                            diff_dates_in_months(
                              proceso.fecha_proxima_actualizacion?.substring(
                                0,
                                10
                              )
                            ) <= 6
                              ? " text-red-500"
                              : ""
                          }`}
                        >
                          <input
                            type="date"
                            id="fecha_proxima_actualizacion"
                            className="appearance-none"
                            defaultValue={proceso.fecha_proxima_actualizacion?.substring(
                              0,
                              10
                            )}
                            onChange={(e) => onDateChange(e, proceso.id)}
                          ></input>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
