import Header from "../../components/Header";
import DropdownProgramas from "../../components/form/DropdownProgramas";
import DropdowClase from "../../components/form/DropdownClase";
import Horas from "../../components/form/Horas";
import Fecha from "../../components/form/Fecha";
import DropdowSalon from "../../components/form/DropdownSalon";
import NumeroServicios from "../../components/form/NumeroServicios";
import { put_fetch } from "../../hooks/put_fetch";
import { useServicio } from "../../hooks/useServicio";
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
      (numeroServicios === "p" || numeroServicios == servicio.num_servicios) &&
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
    if (data.servicio[0]) {
      toast.onChange((payload) => {
        if (payload.type === "success" && payload.status === "removed") {
          navigation(-1);
        }
      });
      toast.success("Servicio cancelado", {
        pauseOnFocusLoss: true,
      });
    } else alert("No se pudo cancelar el servicio");
  };

  const cancelar_servicio = () => {
    const data = {
      estado: "Cancelado",
    };
    const controller = new AbortController();
    const signal = controller.signal;
    const url = `${url_backend}/update_servicio/${id}/`;
    put_fetch(url, signal, data, after_canceled);
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
          <div className="flex justify-between w-80 m-auto font-poppins text-sm mt-4">
            <button
              className="text-gray1 ml-1"
              onClick={() => {
                navigation(-1);
              }}
            >
              Cancelar
            </button>
            <button
              className="font-semibold text-primary"
              onClick={actualizar_informacion}
            >
              Guardar
            </button>
          </div>
          <div className="m-auto w-80 mt-4 ">
            <DropdownProgramas
              escuela="Todos"
              func={setPrograma}
              value={servicio.programa}
            />
            <DropdowClase func={setClase} value={servicio.no_clase} />
            <Fecha setFecha={setFecha} value={servicio.fecha} />
            <h1 className="font-semibold  font-poppins">Horario de clase</h1>
            <Horas
              setHoraFin={setHoraFin}
              setHoraInicio={setHoraInicio}
              value_inicio={servicio.hora_inicio}
              value_fin={servicio.hora_fin}
            />
            <h1 className="font-semibold  font-poppins">Horario de servicio</h1>
            <Horas
              setHoraFin={setHoraServicioFin}
              setHoraInicio={setHoraServicioInicio}
              value_inicio={servicio.hora_servicio_inicio}
              value_fin={servicio.hora_servicio_fin}
            />
            <div className="flex justify-between max">
              <DropdowSalon func={setSalon} value={servicio.salon_id} />
              <NumeroServicios
                setNumeroServicios={setNumeroServicios}
                value={servicio.num_servicios}
              />
            </div>
            <button
              className="font-poppins text-sm rounded-md mb-2 text-deletetext w-80 font-medium h-7 bg-deletebg"
              onClick={cancelar_servicio}
            >
              Cancelar servicio
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
