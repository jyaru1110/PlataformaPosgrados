import Header from "../../../components/Header";
import DropdownProgramas from "../../../components/form/DropdownProgramas";
import DropdowClase from "../../../components/form/DropdownClase";
import Horas from "../../../components/form/Horas";
import Fecha from "../../../components/form/Fecha";
import DropdowSalon from "../../../components/form/DropdownSalon";
import NumeroServicios from "../../../components/form/NumeroServicios";
import { delete_fetch } from "../../../hooks/delete_fetch";
import { put_fetch } from "../../../hooks/put_fetch";
import { useServicio } from "../../../hooks/useServicio";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const url_backend = import.meta.env.VITE_URL_API;

export default function Servicio() {
  const navigation = useNavigate();
  const { state } = useLocation();
  const { id } = state;
  const resultado = useServicio(id);
  const servicio = resultado.servicio;
  const loading = resultado.loading;

  const [fecha, setFecha] = useState("");
  const [loading_req, setLoadingReq] = useState(false);
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [hora_servicio_inicio, setHoraServicioInicio] = useState("");
  const [hora_servicio_fin, setHoraServicioFin] = useState("");
  const [salon, setSalon] = useState("");
  const [clase, setClase] = useState("");
  const [programa, setPrograma] = useState("");
  const [numeroServicios, setNumeroServicios] = useState("p");

  useEffect(() => {
    if (servicio) {
      if (programa === "") {
        setPrograma(servicio.programa);
      }
      if (clase === "") {
        setClase(servicio.no_clase);
      }
      if (horaInicio === "") {
        setHoraInicio(servicio.hora_inicio);
      }
      if (horaFin === "") {
        setHoraFin(servicio.hora_fin);
      }
      if (fecha === "") {
        setFecha(servicio.fecha);
      }
      if (salon === "") {
        setSalon(servicio.salon_id);
      }
      if (numeroServicios === "p") {
        setNumeroServicios(servicio.num_servicios);
      }
      if (hora_servicio_inicio === "") {
        setHoraServicioInicio(servicio.hora_servicio_inicio);
      }
      if (hora_servicio_fin === "") {
        setHoraServicioFin(servicio.hora_servicio_fin);
      }
    }
  }, [
    clase,
    horaInicio,
    horaFin,
    fecha,
    salon,
    programa,
    numeroServicios,
    hora_servicio_inicio,
    hora_servicio_fin,
  ]);

  const after_set = (data) => {
    setLoadingReq(false);
    if (data.servicio) {
      toast.success("Servicio actualizado", {
        pauseOnFocusLoss: true,
      });
    } else if (data.notificacion) {
      toast.info("Solicitud de cambio enviada", {
        pauseOnFocusLoss: true,
      });
    } else {
      toast.error("No se pudo actualizar el servicio", {
        pauseOnFocusLoss: true,
      });
    }
  };

  const actualizar_informacion = () => {
    setLoadingReq(true);
    if (
      programa === "Todos" ||
      clase === "Todos" ||
      horaInicio === "Todos" ||
      horaFin === "Todos" ||
      fecha === "Todos" ||
      salon === "Todos" ||
      numeroServicios === "Todos" ||
      hora_servicio_inicio === "Todos" ||
      hora_servicio_fin === "Todos"
    ) {
      alert('No se puede actualizar con campos en "Todos"');
      return;
    }
    if (numeroServicios === "p") {
      return;
    }

    if (numeroServicios == 0 || numeroServicios === "") {
      alert("El número de servicios no puede ser 0");
      return;
    }

    if (
      (programa === "" || programa == servicio.programa) &&
      (clase === "" || clase == servicio.no_clase) &&
      (horaInicio === "" || horaInicio == servicio.hora_inicio) &&
      (horaFin === "" || horaFin == servicio.hora_fin) &&
      (fecha === "" || fecha == servicio.fecha) &&
      (numeroServicios === "" || numeroServicios == servicio.num_servicios) &&
      (salon === "" || salon == servicio.salon_id) &&
      (hora_servicio_inicio === "" ||
        hora_servicio_inicio == servicio.hora_servicio_inicio) &&
      (hora_servicio_fin === "" ||
        hora_servicio_fin == servicio.hora_servicio_fin)
    )
      return;

    const data = {
      programa: programa,
      no_clase: clase,
      hora_inicio: horaInicio,
      hora_fin: horaFin,
      hora_servicio_inicio: hora_servicio_inicio,
      hora_servicio_fin: hora_servicio_fin,
      fecha: fecha,
      salon_id: salon,
      num_servicios: numeroServicios,
    };

    const controller = new AbortController();
    const signal = controller.signal;
    const url = `${url_backend}/update_servicio/${id}/`;
    put_fetch(url, signal, data, after_set);
    return () => controller.abort();
  };

  const after_canceled = (data) => {
    console.log("after_canceled", data);
    setLoadingReq(false);
    toast.onChange((payload) => {
      if (payload.type === "success" && payload.status === "removed") {
        navigation(-1);
      }
    });
    if (data.data.servicio) {
      toast.success("Servicio cancelado", {
        pauseOnFocusLoss: true,
      });
    } else if (data.data.notificacion) {
      toast.info("Solicitud de cancelación enviada", {
        pauseOnFocusLoss: true,
      });
    } else if (data.data.error) {
      toast.error(data.data.error, {
        pauseOnFocusLoss: true,
      });
    }
  };

  const cancelar_servicio = () => {
    setLoadingReq(true);
    const controller = new AbortController();
    const signal = controller.signal;
    const url = `${url_backend}/delete_servicio/${id}/`;
    delete_fetch(url, signal, after_canceled);
    return () => controller.abort();
  };

  return (
    <>
      {loading ? (
        <div className="m-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      ) : (
        <div className="mt-2">
          <div className="ml-9">
            <Header titulo="Editar o eliminar servicios"></Header>
          </div>

          <div className="m-auto w-80 mt-4 ">
            <DropdownProgramas
              escuela="Todos"
              func={setPrograma}
              value={servicio.programa}
              disabled={true}
            />
            <DropdowClase
              func={setClase}
              value={servicio.no_clase}
              disabled={
                (servicio.estado === "Pendiente" ||
                  servicio.estado === "Confirmado") &&
                localStorage.getItem("rol") !== "Sólo lectura"
                  ? false
                  : true
              }
            />
            <Fecha
              setFecha={setFecha}
              value={servicio.fecha}
              disabled={
                (servicio.estado === "Pendiente" ||
                  servicio.estado === "Confirmado") &&
                localStorage.getItem("rol") !== "Sólo lectura"
                  ? false
                  : true
              }
            />
            <h1 className="font-semibold  font-poppins">Horario de clase</h1>
            <Horas
              setHoraFin={setHoraFin}
              setHoraInicio={setHoraInicio}
              value_inicio={servicio.hora_inicio}
              value_fin={servicio.hora_fin}
              disabled={
                (servicio.estado === "Pendiente" ||
                  servicio.estado === "Confirmado") &&
                localStorage.getItem("rol") !== "Sólo lectura"
                  ? false
                  : true
              }
            />
            <h1 className="font-semibold  font-poppins">Horario de servicio</h1>
            <Horas
              setHoraFin={setHoraServicioFin}
              setHoraInicio={setHoraServicioInicio}
              value_inicio={servicio.hora_servicio_inicio}
              value_fin={servicio.hora_servicio_fin}
              disabled={
                (servicio.estado === "Pendiente" ||
                  servicio.estado === "Confirmado") &&
                localStorage.getItem("rol") !== "Sólo lectura"
                  ? false
                  : true
              }
            />
            <div className="flex justify-between max">
              <DropdowSalon
                func={setSalon}
                value={servicio.salon_id}
                disabled={
                  (servicio.estado === "Pendiente" ||
                    servicio.estado === "Confirmado") &&
                  localStorage.getItem("rol") !== "Sólo lectura"
                    ? false
                    : true
                }
              />
              <NumeroServicios
                setNumeroServicios={setNumeroServicios}
                value={servicio.num_servicios}
                disabled={
                  (servicio.estado === "Pendiente" ||
                    servicio.estado === "Confirmado") &&
                  localStorage.getItem("rol") !== "Sólo lectura"
                    ? false
                    : true
                }
              />
            </div>
            {localStorage.getItem("rol") === "Sólo lectura" ? null : (
              <>
                <button
                  className="font-poppins text-sm rounded-md mb-2 text-deletetext w-80 font-medium h-7 bg-deletebg"
                  onClick={cancelar_servicio}
                  disabled={loading_req}
                >
                  Cancelar servicio
                </button>

                <button
                  className="font-poppins text-sm rounded-md mb-2 bg-primary w-80 font-normal text-white h-7"
                  onClick={actualizar_informacion}
                >
                  Guardar
                </button>
                <button
                  className="text-gray1 font-poppins text-sm rounded-md mb-2 hover:bg-slate-100 w-80 font-normal h-7"
                  onClick={() => {
                    navigation(-1);
                  }}
                >
                  Cancelar
                </button>
              </>
            )}
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
