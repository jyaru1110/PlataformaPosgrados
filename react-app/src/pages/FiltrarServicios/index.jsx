import DropdowClase from "../../components/form/DropdownClase";
import DropdownSalon from "../../components/form/DropdownSalon";
import DropdownEscuelas from "../../components/form/DropdownEscuelas";
import DropdownProgramas from "../../components/form/DropdownProgramas";
import Fechas from "../../components/form/Fechas";
import Horas from "../../components/form/Horas";
import OpcionesEstado from "../../components/form/OpcionesEstado";
import ButtonAdd from "../HomeGestor/components/ButtonAdd";
import Header from "../../components/Header";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useServicios } from "../../hooks/useServicios";
import { date_to_day_dd_mm_2 } from "../../utils/date_to_string";
import { useNavigate } from "react-router-dom";
import { CSVLink, CSVDownload } from "react-csv";

const csvData = [
  { first_name: "cola", email: "si" },
  { first_name: "cola", email: "si" },
  { first_name: "cola", email: "si" },
];

const url_backend = import.meta.env.VITE_URL_API;
const rol = localStorage.getItem("rol");

export default function FiltarServicios() {
  const date = new Date();
  const navigation = useNavigate();
  const resultado = useServicios();
  const servicios = resultado.servicios;
  const [reporte, setReporte] = useState([]);
  const [reporteReady, setReporteReady] = useState(false);
  const [sinResultados, setSinResultados] = useState(false);
  const [servicios_filtrados, setServiciosFiltrados] = useState([]);
  const loading = resultado.loading;
  const [escuela, setEscuela] = useState("Todos");
  const [clase, setClase] = useState("Todos");
  const [hora_inicio, setHoraInicio] = useState("Todos");
  const [hora_fin, setHoraFin] = useState("Todos");
  const [servicios_confirmados, setServiciosConfirmados] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fecha_inicio, setFechaInicio] = useState(
    date.toISOString().substring(0, 10)
  );
  const [fecha_fin, setFechaFin] = useState("Todos");
  const [salones, setSalones] = useState("Todos");
  const [programa, setPrograma] = useState("Todos");
  const [estados, setEstados] = useState([
    "Pendiente",
    "Cancelado",
    "Realizado",
    "Confirmado",
  ]);
  const [sumaServicios, setSumaServicios] = useState({});

  const select_servicio_confirmado = (servicio) => {
    if (servicios_confirmados.includes(servicio)) {
      setServiciosConfirmados((servicios_confirmados) =>
        servicios_confirmados.filter((servicio_i) => servicio_i !== servicio)
      );
    } else {
      setServiciosConfirmados((servicios_confirmados) => [
        ...servicios_confirmados,
        servicio,
      ]);
    }
  };

  const confirmar_servicios = () => {
    if (isLoading) return;
    setIsLoading(true);
    axios
      .put(
        url_backend + "/servicios/confirmar",
        {
          fecha_inicio: fecha_inicio,
          fecha_fin: fecha_fin,
        },
        {
          withCredentials: true,
        }
      )
      .then((resultado) => {
        setIsLoading(false);
        setReporte(resultado.data.servicios);
        toast.success("Servicios confirmados", {
          pauseOnFocusLoss: true,
        });
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Error al confirmar servicios", {
          pauseOnFocusLoss: true,
        });
      });
  };

  const after_descargar_report = () => {
      toast.success("Reporte descargado", {
        pauseOnFocusLoss: true,
      });
      setReporteReady(false);
  }

  useEffect(() => {
    if (reporte.length !== 0) {
      setReporteReady(true);
    } else {
      setReporteReady(false);
    }
  }, [reporte]);

  const cancelar_servicios = () => {
    setIsLoading(true);
    toast.onChange((payload) => {
      if (payload.type === "success" && payload.status === "removed") {
        window.location.reload();
      }
    });
    axios
      .put(
        url_backend + "/servicios/cancelar",
        {
          servicios: servicios_confirmados,
        },
        {
          withCredentials: true,
        }
      )
      .then((resultado) => {
        setIsLoading(false);
        toast.success("Servicios cancelados", {
          pauseOnFocusLoss: true,
        });
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Error al cancelar servicios", {
          pauseOnFocusLoss: true,
        });
      });
  };

  const filtrar = (servicio) => {
    if (programa !== "Todos" && servicio.programa !== programa) {
      return false;
    }
    if (clase !== "Todos" && servicio.no_clase !== clase) {
      return false;
    }
    if (
      hora_inicio !== "Todos" &&
      servicio.hora_inicio.substring(0, 5) < hora_inicio
    ) {
      return false;
    }
    if (hora_fin !== "Todos" && servicio.hora_fin.substring(0, 5) > hora_fin) {
      return false;
    }
    if (fecha_inicio !== "Todos" && servicio.fecha < fecha_inicio) {
      return false;
    }
    if (fecha_fin !== "Todos" && servicio.fecha > fecha_fin) {
      return false;
    }
    if (salones !== "Todos" && servicio.salon_id !== salones) {
      return false;
    }
    if (!estados.includes(servicio.estado)) {
      return false;
    }
    if (escuela !== "Todos" && servicio.escuela !== escuela) {
      return false;
    }
    return true;
  };
  useEffect(() => {
    if (!servicios) return;
    setServiciosFiltrados(servicios.filter(filtrar));
  }, [
    escuela,
    clase,
    hora_inicio,
    hora_fin,
    fecha_inicio,
    fecha_fin,
    salones,
    estados,
    programa,
    servicios,
  ]);

  useEffect(() => {
    const suma = {
      Confirmado: 0,
      Pendiente: 0,
      Cancelado: 0,
      Realizado: 0,
    };
    servicios_filtrados.forEach((servicio) => {
      suma[servicio.estado] += servicio.num_servicios;
    });
    if (servicios_filtrados.length === 0) {
      setSinResultados(true);
    } else {
      setSinResultados(false);
    }
    setSumaServicios(suma);
  }, [servicios_filtrados]);

  return (
    <div className="w-11/12 pt-2 sm:flex sm:w-full">
      <div className="mt-2 ml-9 w-80 md:fixed">
        <Header titulo="Buscar servicios" />
        <DropdownEscuelas func={setEscuela} />
        <DropdownProgramas func={setPrograma} escuela={escuela} />
        <DropdowClase func={setClase} />
        <DropdownSalon func={setSalones} />
        <Fechas
          setFechaFin={setFechaFin}
          setFechaInicio={setFechaInicio}
          value_inicio={fecha_inicio}
        />
        <Horas setHoraFin={setHoraFin} setHoraInicio={setHoraInicio} />
        <OpcionesEstado estados={estados} setEstados={setEstados} />
        <div className="flex flex-col items-center mt-2 font-poppins">
          <table className="table-auto w-full">
            <thead className="max-w-full text-center">
              <tr className="max-w-full text-xs">
                <th className="font-thin text-left">Pendiente</th>
                <th className="font-thin">Cancelado</th>
                <th className="font-thin">Realizado</th>
                <th className="font-thin text-right">Confirmado</th>
              </tr>
            </thead>
            <tbody className="max-w-full text-center">
              <tr className="max-w-full text-sm text-primary">
                <td className="font-bold">{sumaServicios.Pendiente}</td>
                <td className="font-bold">{sumaServicios.Cancelado}</td>
                <td className="font-bold">{sumaServicios.Realizado}</td>
                <td className="font-bold">{sumaServicios.Confirmado}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {servicios_confirmados.length > 0 ? (
          <button
            className="text-deletetext font-poppins rounded-lg bg-deletebg font-normal mt-2 w-full h-7"
            onClick={() => {
              cancelar_servicios();
            }}
            disabled={isLoading}
          >
            Cancelar servicios
          </button>
        ) : null}
        {fecha_inicio !== "Todos" &&
        fecha_fin !== "Todos" &&
        rol == "Gestor" ? (
          <>
            {reporteReady ? (
              <CSVLink
                data={reporte}
                className="text-white font-poppins rounded-lg bg-primary font-normal mt-2 w-full h-7 flex justify-center items-center"
                filename="reporte.csv"
                onClick={after_descargar_report}
              >
                Descargar reporte
              </CSVLink>
            ) : (
              <button
                className="text-white font-poppins rounded-lg bg-primary font-normal mt-2 w-full h-7 flex justify-center items-center"
                onClick={confirmar_servicios}
              >
                Confirmar servicios
              </button>
            )}
          </>
        ) : null}
      </div>
      <div className={"mt-4 flex flex-wrap md:ml-96 w-full"}>
        {loading ? (
          <div className="m-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        ) : sinResultados ? (
          <h1 className="font-poppins font-medium">
            No se encontró ningún resultado
          </h1>
        ) : (
          servicios_filtrados.map((servicio_i) => {
            return (
              <div
                className="rounded-3xl bg-primarylight w-96 ml-9 mb-4 p-2.5 font-poppins flex flex-col md:ml-2 max-h-32"
                key={servicio_i.id}
              >
                <div className="flex w-full justify-between">
                  <p className="text-primary font-semibold text-xs mb-1">
                    Salón {servicio_i.salon_id}
                  </p>
                  {servicio_i.estado === "Pendiente" ? (
                    <>
                      {servicios_confirmados.length === 0 ? (
                        <p
                          className="text-yellowtext bg-yellowbg py px-1 rounded-xl w-20 text-center text-xs mb-1 ml-1 cursor-pointer"
                          onClick={() => {
                            select_servicio_confirmado(servicio_i.id);
                          }}
                        >
                          {servicio_i.estado}
                        </p>
                      ) : (
                        <span
                          className={`rounded-xl h-6 w-6 shadow-md cursor-pointer ${
                            servicios_confirmados.includes(servicio_i.id)
                              ? "bg-blue-600"
                              : "bg-white"
                          }`}
                          onClick={() => {
                            select_servicio_confirmado(servicio_i.id);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            viewBox="0 0 512 512"
                            id="tick"
                            fill="white"
                          >
                            <path d="M223.9 329.7c-2.4 2.4-5.8 4.4-8.8 4.4s-6.4-2.1-8.9-4.5l-56-56 17.8-17.8 47.2 47.2L340 177.3l17.5 18.1-133.6 134.3z"></path>
                          </svg>
                        </span>
                      )}
                    </>
                  ) : servicio_i.estado === "Cancelado" ? (
                    <p className="text-redtext bg-redbg py px-1 rounded-xl w-20 text-center text-xs mb-1 ml-1">
                      {servicio_i.estado}
                    </p>
                  ) : servicio_i.estado == "Realizado" ? (
                    <p className=" text-slate-600 bg-slate-200  py px-1 rounded-xl w-20 text-center text-xs mb-1 ml-1">
                      {servicio_i.estado}
                    </p>
                  ) : (
                    <>
                      {servicios_confirmados.length === 0 ? (
                        <p
                          className="text-greentext bg-greenbg py px-1 rounded-xl w-20 text-center text-xs mb-1 ml-1 cursor-pointer"
                          onClick={() => {
                            select_servicio_confirmado(servicio_i.id);
                          }}
                        >
                          {servicio_i.estado}
                        </p>
                      ) : (
                        <span
                          className={`rounded-xl h-6 w-6 shadow-md cursor-pointer ${
                            servicios_confirmados.includes(servicio_i.id)
                              ? "bg-blue-600"
                              : "bg-white"
                          }`}
                          onClick={() => {
                            select_servicio_confirmado(servicio_i.id);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            viewBox="0 0 512 512"
                            id="tick"
                            fill="white"
                          >
                            <path d="M223.9 329.7c-2.4 2.4-5.8 4.4-8.8 4.4s-6.4-2.1-8.9-4.5l-56-56 17.8-17.8 47.2 47.2L340 177.3l17.5 18.1-133.6 134.3z"></path>
                          </svg>
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div
                  className="flex justify-between cursor-pointer"
                  onClick={() => {
                    navigation("/servicio", { state: { id: servicio_i.id } });
                  }}
                >
                  <div className="w-3/4">
                    <div className="flex">
                      <p className="text-gray1 text-xs mb-1 mr-1">
                        {servicio_i.hora_servicio_inicio
                          ? servicio_i.hora_servicio_inicio.substring(0, 5)
                          : servicio_i.hora_inicio.substring(0, 5)}
                        -
                        {servicio_i.hora_servicio_fin
                          ? servicio_i.hora_servicio_fin.substring(0, 5)
                          : servicio_i.hora_fin.substring(0, 5)}{" "}
                        •
                      </p>
                      <p className="text-gray1 text-xs mb-1">
                        Clase {servicio_i.no_clase}
                      </p>
                    </div>

                    <p className="text-gray1 text-xs mb-1">
                      {date_to_day_dd_mm_2(servicio_i.fecha)}{" "}
                      {servicio_i.fecha.substring(0, 4)}
                    </p>

                    <p className="text-gray1 text-xs mb-1 font-medium">
                      {servicio_i.programa}
                    </p>
                  </div>
                  <div className="flex justify-center flex-col items-center cursor-pointer">
                    <p className="text-primary font-semibold text-xl">
                      {servicio_i.num_servicios}
                    </p>
                    <p className="text-gray1 text-xs">Servicios</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="fixed right-14 bottom-14">
        <ButtonAdd ruta="/add-servicio" />
      </div>
      <ToastContainer />
    </div>
  );
}
