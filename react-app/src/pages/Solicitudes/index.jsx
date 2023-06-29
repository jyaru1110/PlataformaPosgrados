import Header from "../../components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useSolicitudes } from "../../hooks/useSolicitudes";
import axios from "axios";
const url_backend = import.meta.env.VITE_URL_API;

export default function Solicitudes() {
  const [seleccionados, setSeleccionados] = useState([]);
  const [loadingR, setLoadingR] = useState(false);
  const [loadingA, setLoadingA] = useState(false);
  const resultado = useSolicitudes();
  const solicitudes = resultado.solicitudes;
  const loading = resultado.loading;
  const rol = localStorage.getItem("rol");
  const onCheck = (id) => {
    if (seleccionados.includes(id)) {
      setSeleccionados(seleccionados.filter((item) => item !== id));
    } else {
      setSeleccionados([...seleccionados, id]);
    }
  };

  const aceptarSolicitudes = () => {
    seleccionados.map((id) => {
      setLoadingA(true);
      axios
        .put(
          url_backend + "/solicitudes/aceptar/" + id,
          {},
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          toast.onChange((payload) => {
            if (payload.type === "success" && payload.status === "removed") {
              window.location.reload();
            }
          });
          toast.success("Solicitudes aceptadas", {
            pauseOnFocusLoss: true,
          });
          setLoadingA(false);
        })
        .catch((err) => {
          toast.error("No se pudieron aceptar las solicitudes", {
            pauseOnFocusLoss: true,
          });
          setLoadingA(false);
        });
    });
  };

  const rechazarSolicitudes = () => {
    seleccionados.map((id) => {
      setLoadingR(true);
      axios
        .put(
          url_backend + "/solicitudes/rechazar/" + id,
          {},
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          toast.onChange((payload) => {
            if (payload.type === "success" && payload.status === "removed") {
              window.location.reload();
            }
          });
          toast.success("Solicitudes rechazadas", {
            pauseOnFocusLoss: true,
          });
          setLoadingR(false);
        })
        .catch((err) => {
          toast.error("No se pudieron rechazar las solicitudes", {
            pauseOnFocusLoss: true,
          });
          setLoadingR(false);
        });
    });
  };

  const cancelarSolicitudes = () => {
    seleccionados.map((id) => {
      setLoadingR(true);
      axios
        .delete(url_backend + "/solicitudes/cancelar/" + id, {
          withCredentials: true,
        })
        .then((res) => {
          toast.onChange((payload) => {
            if (payload.type === "success" && payload.status === "removed") {
              window.location.reload();
            }
          });
          toast.success("Solicitudes canceladas", {
            pauseOnFocusLoss: true,
          });
          setLoadingR(false);
        })
        .catch((err) => {
          setLoadingR(false);
        });
    });
  };

  return (
    <div className="w-screen flex flex-col items-start p-8">
      <div className="w-11/12 flex justify-between mb-4 fixed flex-wrap">
        <Header titulo="Solicitudes"></Header>
      </div>
      <div className="fixed top-8 right-8">
        {rol === "Gestor" ? (
          <>
            {loadingR ? null : (
              <button
                className={`${
                  seleccionados.length > 0 ? "bg-primary" : "bg-slate-100"
                } text-white font-poppins font-medium text-sm px-4 py-2 rounded-md`}
                onClick={aceptarSolicitudes}
                disabled={loadingA}
              >
                Aceptar
              </button>
            )}
            {loadingA ? null : (
              <button
                className={`${
                  seleccionados.length > 0 ? "bg-primary" : "bg-slate-100"
                } text-white font-poppins font-medium text-sm px-4 py-2 rounded-md ml-4`}
                onClick={rechazarSolicitudes}
                disabled={loadingR}
              >
                Rechazar
              </button>
            )}
          </>
        ) : (
          <>
            <button
              className={`${
                seleccionados.length > 0 ? "bg-primary" : "bg-slate-100"
              } text-white font-poppins font-medium text-sm px-4 py-2 rounded-md`}
              onClick={cancelarSolicitudes}
            >
              Eliminar solicitudes
            </button>
          </>
        )}
      </div>
      <table className="table-auto border-collapse w-full mt-14">
        <thead className="bg-slate-100 font-poppins">
          <tr className="text-left border-y border-x-0">
            <th className="border-r p-2 font-medium">Tipo</th>
            <th className="border-r p-2 font-medium">Persona</th>
            <th className="border-r font-medium p-2">Salón</th>
            <th className="border-r font-medium p-2">Programa</th>
            <th className="border-r p-2 font-medium">Fecha inicio</th>
            <th className="border-r p-2 font-medium">Fecha fin</th>
            <th className="border-r p-2 font-medium">Hora incio</th>
            <th className="border-r p-2 font-medium">Hora fin</th>
            <th className="border-r p-2 font-medium">Hora incio servicio</th>
            <th className="border-r p-2 font-medium">Hora fin servicio</th>
            <th className="border-r p-2 font-medium">No. Clase</th>
            <th className="border-r p-2 font-medium">Dia</th>
            <th className="p-2 font-medium">Número servicios</th>
          </tr>
        </thead>

        {loading ? (
          <div className="m-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        ) : (
          <tbody className="font-poppins text-base">
            {solicitudes.map((solicitud) => {
              return (
                <tr
                  className={`${
                    solicitud.estado == "Aceptado"
                      ? "bg-green-50"
                      : solicitud.estado == "Rechazado"
                      ? "bg-red-50"
                      : ""
                  } border-x-0 border-y`}
                  key={solicitud.id}
                >
                  <td className="border-r p-2">
                    {solicitud.tipo == "Nuevo" ? (
                      <div className="bg-greenbg text-greentext text-center text-xs p-1 rounded-2xl">
                        {solicitud.tipo}
                      </div>
                    ) : (
                      <>
                        {solicitud.tipo == "Cambio" ? (
                          <div className="bg-yellowbg text-yellowtext text-center text-xs p-1 rounded-2xl">
                            {solicitud.tipo}
                          </div>
                        ) : (
                          <div className="bg-redbg text-redtext text-center text-xs p-1 rounded-2xl">
                            {solicitud.tipo}
                          </div>
                        )}
                      </>
                    )}
                  </td>
                  <td className="border-r p-2">{solicitud.nombre}</td>
                  <td className="border-r p-2">{solicitud.salon||solicitud.h_salon}</td>
                  <td className="border-r p-2">{solicitud.programa||solicitud.h_programa}</td>
                  <td className="border-r p-2">{solicitud.fecha_inicio||solicitud.h_fecha_inicio}</td>
                  <td className="border-r p-2">{solicitud.fecha_fin||solicitud.h_fecha_fin}</td>
                  <td className="border-r p-2">{solicitud.hora_inicio||solicitud.h_hora_inicio}</td>
                  <td className="border-r p-2">{solicitud.hora_fin||solicitud.h_hora_fin}</td>
                  <td className="border-r p-2">
                    {solicitud.hora_servicio_inicio||solicitud.h_hora_s_inicio}
                  </td>
                  <td className="border-r p-2">
                    {solicitud.hora_servicio_fin||solicitud.h_hora_s_fin}
                  </td>
                  <td className="border-r p-2">{solicitud.no_clase||solicitud.h_no_clase}</td>
                  <td className="border-r p-2">{solicitud.dia||solicitud.h_dia}</td>
                  <td className="border-r p-2">{solicitud.num_alumnos||solicitud.h_num_alumnos}</td>
                  <td className="p-2 text-center">
                    <input
                      type="checkbox"
                      onChange={() => onCheck(solicitud.id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      <ToastContainer />
    </div>
  );
}
