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
import { useState } from "react";
import { useServicios } from "../../hooks/useServicios";
import { date_to_day_dd_mm_2 } from "../../utils/date_to_string";
import { useNavigate } from "react-router-dom";

const url_backend  = import.meta.env.VITE_URL_API;

export default function FiltarServicios() {
  const date = new Date();
  const navigation = useNavigate();
  const resultado = useServicios();
  const servicios = resultado.servicios;
  const loading = resultado.loading;
  const [escuela, setEscuela] = useState("Todos");
  const [clase, setClase] = useState("Todos");
  const [hora_inicio, setHoraInicio] = useState("Todos");
  const [hora_fin, setHoraFin] = useState("Todos");
  const [servicios_confirmados, setServiciosConfirmados] = useState([]);
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
    axios.put(url_backend + "/servicios/confirmar", {
      servicios: servicios_confirmados,
    },
    {
      withCredentials: true,
    }).then(() => {
      window.location.reload();
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
    return true;
  };

  return (
    <div className="w-11/12 pt-2 sm:flex sm:w-full">
      <div className="mt-2 ml-9 w-80 md:fixed">
        <Header titulo="Buscar servicios" />
        <DropdownEscuelas func={setEscuela} />
        <DropdownProgramas func={setPrograma} escuela={escuela} />
        <DropdowClase func={setClase} />
        <DropdownSalon func={setSalones} />
        <Horas setHoraFin={setHoraFin} setHoraInicio={setHoraInicio} />
        <Fechas
          setFechaFin={setFechaFin}
          setFechaInicio={setFechaInicio}
          value_inicio={fecha_inicio}
        />
        <OpcionesEstado estados={estados} setEstados={setEstados} />
        {servicios_confirmados.length > 0 ? <button className="w-full p-1 bg-blue-600 font-poppins text-white font-medium mt-2 rounded-xl" onClick={()=>{confirmar_servicios()}}>Confirmar</button> : null}
      </div>
      <div className="mt-4 flex flex-wrap md:ml-96 w-full">
        {loading ? (
          <div className="m-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        ) : (
          servicios.filter(filtrar).map((servicio_i) => (
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
                        className={`rounded-xl h-5 w-5 shadow-md cursor-pointer ${
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
                          width="20"
                          height="20"
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
                  <p className="text-greentext bg-greenbg py px-1 rounded-xl w-20 text-center text-xs mb-1 ml-1">
                    {servicio_i.estado}
                  </p>
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
          ))
        )}
      </div>
      <div className="fixed right-14 bottom-14">
        <ButtonAdd ruta="/add-servicio" />
      </div>
    </div>
  );
}
