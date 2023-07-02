import Header from "../../components/Header";
import DropdownProgramas from "../../components/form/DropdownProgramas";
import DropdowClase from "../../components/form/DropdownClase";
import Horas from "../../components/form/Horas";
import Fechas from "../../components/form/Fechas";
import DropdowSalon from "../../components/form/DropdownSalon";
import DropdownDia from "../../components/form/DropdownDia";
import NumeroServicios from "../../components/form/NumeroServicios";
import { useState, useEffect } from "react";
import { useHorario } from "../../hooks/useHorario";
import { useNavigate, useLocation } from "react-router-dom";
import { put_fetch } from "../../hooks/put_fetch";
import { delete_fetch } from "../../hooks/delete_fetch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const url_backend = import.meta.env.VITE_URL_API;

export default function Horario() {
  const { state } = useLocation();
  const navigation = useNavigate();
  const { id_horario } = state;
  const resultado = useHorario(id_horario);
  const horario = resultado.horario;
  const loading = resultado.loading;

  const [programa, setPrograma] = useState("");
  const [clase, setClase] = useState("");
  const [hora_inicio, setHoraInicio] = useState("");
  const [hora_fin, setHoraFin] = useState("");
  const [hora_servicio_inicio, setHoraServicioInicio] = useState("");
  const [hora_servicio_fin, setHoraServicioFin] = useState("");
  const [fecha_inicio, setFechaInicio] = useState("");
  const [fecha_fin, setFechaFin] = useState("");
  const [salones, setSalones] = useState("");
  const [numero_servicios, setNumeroServicios] = useState(0);
  const [dia, setDia] = useState("");

  useEffect(() => {
    if (horario) {
      if (programa === "") {
        setPrograma(horario[0].programa);
      }
      if (clase === "") {
        setClase(horario[0].no_clase);
      }
      if (hora_inicio === "") {
        setHoraInicio(horario[0].hora_inicio);
      }
      if (hora_fin === "") {
        setHoraFin(horario[0].hora_fin);
      }
      if (hora_servicio_inicio === "") {
        setHoraServicioInicio(horario[0].hora_servicio_inicio);
      }
      if (hora_servicio_fin === "") {
        setHoraServicioFin(horario[0].hora_servicio_fin);
      }
      if (fecha_inicio === "") {
        setFechaInicio(horario[0].fecha_inicio);
      }
      if (fecha_fin === "") {
        setFechaFin(horario[0].fecha_fin);
      }
      if (salones === "") {
        setSalones(horario[0].salon);
      }
      if (dia === "") {
        setDia(horario[0].dia);
      }
      if (numero_servicios === 0) {
        setNumeroServicios(horario[0].numero_servicios);
      }
    }
  }, [
    programa,
    clase,
    hora_inicio,
    hora_fin,
    fecha_inicio,
    fecha_fin,
    salones,
    dia,
    hora_servicio_fin,
    hora_servicio_inicio,
    numero_servicios,
  ]);

  const after_set = (data) => {
    if (data.horario) {
      toast.success("Horario actualizado", {
        pauseOnFocusLoss: true,
      });
    } else if(data.notificacion){
      toast.info("Solicitud de cambio enviada", {
        pauseOnFocusLoss: true,
      });
    }
    else
      toast.error("No se pudo actualizar horario", {
        pauseOnFocusLoss: true,
      });
  };

  const actualizar_informacion = () => {
    if (
      programa === "Todos" ||
      clase === "Todos" ||
      hora_inicio === "Todos" ||
      hora_fin === "Todos" ||
      hora_servicio_inicio === "Todos" ||
      hora_servicio_fin === "Todos" ||
      fecha_inicio === "Todos" ||
      fecha_fin === "Todos" ||
      salones === "Todos" ||
      dia === "Todos"
    ) {
      alert('No se puede actualizar con campos en "Todos"');
      return;
    }
    if (numero_servicios === "p") {
      return;
    }

    if (numero_servicios == 0 || numero_servicios === "") {
      alert("El número de servicios no puede ser 0");
      return;
    }

    if (
      (programa === "" || programa == horario[0].programa) &&
      (clase === "" || clase == horario[0].no_clase) &&
      (hora_inicio === "" || hora_inicio == horario[0].hora_inicio) &&
      (hora_fin === "" || hora_fin == horario[0].hora_fin) &&
      (fecha_inicio === "" || fecha_inicio == horario[0].fecha_inicio) &&
      (fecha_fin === "" || fecha_fin == horario[0].fecha_fin) &&
      (salones === "" || salones == horario[0].salon) &&
      (hora_servicio_inicio === "" ||
        hora_servicio_inicio == horario[0].hora_servicio_inicio) &&
      (hora_servicio_fin === "" ||
        hora_servicio_fin == horario[0].hora_servicio_fin) &&
      (numero_servicios === 0 ||
        numero_servicios == horario[0].numero_servicios) &&
      (dia === "" || dia == horario[0].dia)
    )
      return;

    const data = {
      programa: programa,
      no_clase: clase,
      hora_inicio: hora_inicio,
      hora_fin: hora_fin,
      hora_servicio_inicio: hora_servicio_inicio,
      hora_servicio_fin: hora_servicio_fin,
      fecha_inicio: fecha_inicio,
      fecha_fin: fecha_fin,
      salon: salones,
      dia: dia,
      num_alumnos: numero_servicios,
    };
      const controller = new AbortController();
      const signal = controller.signal;
      const url = `${url_backend}/update_horario/${id_horario}`;
      put_fetch(url, signal, data, after_set);
      return () => controller.abort();
  };

  const after_delete = (data) => {
    toast.onChange((payload) => {
      if (payload.type === "success" && payload.status === "removed") {
        navigation(-1);
      }
    });
    if (data.data.notificacion) {
      toast.info("Solicitud de cancelación de horario enviada", {
        pauseOnFocusLoss: true,
      });
    } else if(data.data.horario){
      toast.success("Horario eliminado", {
        pauseOnFocusLoss: true,
      });
    } else
      toast.error("No se pudo eliminar horario", {
        pauseOnFocusLoss: true,
      });
  };

  const eliminar_horario = () => {
    const controller = new AbortController();
    const signal = controller.signal;
    const url = `${url_backend}/delete_horario/${id_horario}/`;
    delete_fetch(url, signal, after_delete);
    return () => controller.abort();
  };

  return (
    <>
      {loading ? (
        <div className="m-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      ) : (
        <div className="mt-2">
          <div className="ml-9">
            <Header titulo="Editar o eliminar horarios"></Header>
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
              func={setPrograma}
              value={horario[0].programa}
              escuela="Todos"
            />
            <DropdowClase func={setClase} value={horario[0].no_clase} />
            <Fechas
              setFechaFin={setFechaFin}
              setFechaInicio={setFechaInicio}
              value_inicio={horario[0].fecha_inicio}
              value_fin={horario[0].fecha_fin}
            />
            <h1 className="font-semibold  font-poppins">Horario de clase</h1>
            <Horas
              setHoraFin={setHoraFin}
              setHoraInicio={setHoraInicio}
              value_inicio={horario[0].hora_inicio}
              value_fin={horario[0].hora_fin}
            />
            <h1 className="font-semibold font-poppins">Horario de servicio</h1>
            <Horas
              setHoraFin={setHoraServicioFin}
              setHoraInicio={setHoraServicioInicio}
              value_inicio={horario[0].hora_servicio_inicio}
              value_fin={horario[0].hora_servicio_fin}
            />
            <DropdownDia func={setDia} value={horario[0].dia} />
            <div className="flex justify-between max">
              <DropdowSalon func={setSalones} value={horario[0].salon} />
              <NumeroServicios
                setNumeroServicios={setNumeroServicios}
                value={horario[0].num_alumnos}
              />
            </div>
            <button
              className="font-poppins text-sm rounded-md mb-2 text-deletetext w-80 font-medium h-7 bg-deletebg"
              onClick={eliminar_horario}
            >
              Eliminar horario
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
