import Header from "../../../components/Header";
import InputClase from "./components/InputClase";
import SelectSalon from "./components/SelectSalon";
import { useState } from "react";
import SelectPrograma from "./components/SelectPrograma";
import { usePrograma } from "../../../hooks/usePrograma";
import { useSalones } from "../../../hooks/useSalones";
import { salones_to_correct_format } from "../../../utils/salones_to_correct_format";
import { useClases } from "../../../hooks/useClases";
import SelectDia from "./components/SelectDia";
import { post_axios } from "../../../hooks/post_axios";
import { ToastContainer, toast } from "react-toastify";
import FilePopUp from "./components/FilePopUp";
import { setShow } from "./components/FilePopUp";
import "react-toastify/dist/ReactToastify.css";

export default function AddServicio() {
  const rol = localStorage.getItem("rol");
  const escuela = localStorage.getItem("escuela");
  const [servicios, setServicios] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingClass, setIsAddingClass] = useState(false);

  const url_backend = import.meta.env.VITE_URL_API;

  const options_dias = [
    { value: "Lunes" },
    { value: "Martes" },
    { value: "Miércoles" },
    { value: "Jueves" },
    { value: "Viernes" },
    { value: "Sábado" },
  ];

  const clases = useClases();
  const options_clases = clases.clases;
  const setClases = clases.setClases;

  const salones = useSalones();
  const options_salones = salones_to_correct_format(salones);

  const options_programas = usePrograma(rol == "Gestor" ? "Todos" : escuela);

  const send_servicios = () => {
    setIsLoading(true);
    const hoy = new Date();
    const string_hoy = hoy.toISOString().substring(0, 10);
    if (servicios.length === 0) {
      toast.error("No hay servicios");
      setIsLoading(false);
      return;
    }
    servicios.forEach((servicio) => {
      if (
        servicio.programaPrograma === "" ||
        servicio.programaPrograma === "Todos" ||
        servicio.no_clase === "" ||
        servicio.no_clase === "Todos" ||
        servicio.salon === "" ||
        servicio.salon === "Todos" ||
        servicio.dia === "" ||
        servicio.dia === "Todos" ||
        servicio.hora_inicio === "" ||
        servicio.hora_inicio === "Todos" ||
        servicio.hora_fin === "" ||
        servicio.hora_fin === "Todos" ||
        servicio.fecha_inicio === "" ||
        servicio.fecha_inicio === "Todos" ||
        servicio.fecha_fin === "" ||
        servicio.fecha_fin === "Todos" ||
        servicio.num_alumnos < 0
      ) {
        seleccionados.includes(servicio.id)
          ? null
          : setSeleccionados([...seleccionados, servicio.id]);
        toast.error("Faltan campos por llenar");
        setIsLoading(false);
        return;
      }
      if (
        servicio.dia === "Sábado" &&
        (parseInt(servicio.hora_servicio_inicio.substring(0, 2)) > 12 ||
          parseInt(servicio.hora_servicio_inicio.substring(0, 2)) < 10 ||
          parseInt(servicio.hora_servicio_fin.substring(0, 2)) > 12 ||
          parseInt(servicio.hora_servicio_fin.substring(0, 2)) < 10)
      ) {
        seleccionados.includes(servicio.id)
          ? null
          : setSeleccionados([...seleccionados, servicio.id]);
        toast.error(
          "Las islas solo están disponible de 10:00 a 12:00 los sábados"
        );
        setIsLoading(false);
        return;
      }
      if (servicio.fecha_inicio < string_hoy) {
        seleccionados.includes(servicio.id)
          ? null
          : setSeleccionados([...seleccionados, servicio.id]);
        setIsLoading(false);
        toast.error("La fecha de inicio no puede ser hoy o antes");
        return;
      }
      if (servicio.fecha_fin < servicio.fecha_inicio) {
        seleccionados.includes(servicio.id)
          ? null
          : setSeleccionados([...seleccionados, servicio.id]);
        setIsLoading(false);
        toast.error(
          "La fecha de fin no puede ser menor o igual a la fecha de inicio"
        );
        return;
      }
      if (servicio.hora_fin <= servicio.hora_inicio) {
        seleccionados.includes(servicio.id)
          ? null
          : setSeleccionados([...seleccionados, servicio.id]);
        setIsLoading(false);
        toast.error("La hora de fin no puede ser menor a la hora de inicio");
        return;
      }

      const response = post_axios(url_backend + "/create_horario", servicio);
      response
        .then((data) => {
          setIsLoading(false);
          if (data.data.notificacion) {
            toast.info("Solictud enviada");
          } else if (data.data.servicio || data.data.horario) {
            toast.success("Servicio creado");
          } else {
            console.log(data);
            toast.error("La api no regresó nada");
          }
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error.response.data.message);
        });
    });
  };
  const addServicio = () => {
    setServicios([
      ...servicios,
      {
        id: servicios.length,
        programaPrograma: "",
        no_clase: "Todos",
        salon: "",
        dia: "Lunes",
        hora_inicio: "",
        hora_fin: "",
        hora_servicio_inicio: "",
        hora_servicio_fin: "",
        num_alumnos: 0,
        fecha_inicio: "",
        fecha_fin: "",
      },
    ]);
  };

  const duplicar_fila = (id) => {
    const servicio_a_duplicar = servicios.find(
      (servicio) => servicio.id === id
    );
    setServicios([
      ...servicios,
      {
        id: servicios.length,
        programaPrograma: servicio_a_duplicar.programaPrograma,
        no_clase: servicio_a_duplicar.no_clase,
        salon: servicio_a_duplicar.salon,
        dia: servicio_a_duplicar.dia,
        hora_inicio: servicio_a_duplicar.hora_inicio,
        hora_fin: servicio_a_duplicar.hora_fin,
        hora_servicio_inicio: servicio_a_duplicar.hora_servicio_inicio,
        hora_servicio_fin: servicio_a_duplicar.hora_servicio_fin,
        num_alumnos: servicio_a_duplicar.num_alumnos,
        fecha_inicio: servicio_a_duplicar.fecha_inicio,
        fecha_fin: servicio_a_duplicar.fecha_fin,
      },
    ]);
  };

  const updateServicio = (id, updatedServicio) => {
    setServicios(
      servicios.map((servicio) =>
        servicio.id === id ? updatedServicio : servicio
      )
    );
  };

  const deleteServicio = (id) => {
    setServicios(servicios.filter((servicio) => servicio.id !== id));
    setSeleccionados(
      seleccionados.filter((seleccionado) => seleccionado !== id)
    );
  };

  return (
    <div className="w-screen flex flex-col items-start p-8">
      <FilePopUp />
      <div className="w-11/12 flex justify-between mb-4 fixed flex-wrap">
        <Header titulo="Añadir servicio"></Header>
        <button
          onClick={() => setShow(true)}
          className={`font-poppins bg-primary text-whiteprimary px-2 rounded-lg ml-1 flex items-center`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-70 mr-2"
          >
            <path
              d="M3 12.0042V21H21V12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.5 7.5L12 3L7.5 7.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.9958 16V3"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Sube un archivo
        </button>
        <button
          className={`${
            isLoading || servicios.length === 0 ? "opacity-30" : "opacity-100"
          } font-poppins bg-primary text-whiteprimary px-2 rounded-lg ml-1`}
          onClick={send_servicios}
          disabled={isLoading || servicios.length === 0}
        >
          {isLoading ? (
            <div className="m-auto h-2 p-2 w-2 animate-spin rounded-full border-4 border-solid border-whitebg border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          ) : (
            "Crear servicios"
          )}
        </button>
      </div>
      <table className="table-auto border-collapse w-full mt-14">
        <thead className="bg-slate-100 font-poppins">
          <tr className="text-left border-y border-x-0">
            <th className="border-r font-medium p-2">Programa</th>
            <th className="border-r font-medium p-2">Clase</th>
            <th className="border-r p-2 font-medium">Salon</th>
            <th className="border-r p-2 font-medium">Dia</th>
            <th className="border-r p-2 font-medium">Hora inicio</th>
            <th className="border-r p-2 font-medium">Hora fin</th>
            <th className="border-r p-2 font-medium">Hora inicio servicio</th>
            <th className="border-r p-2 font-medium">Hora fin servicio</th>
            <th className="border-r p-2 font-medium">Fecha inicio</th>
            <th className="border-r p-2 font-medium">Fecha fin</th>
            <th className="border-r p-2 font-medium">Número de servicios</th>
          </tr>
        </thead>
        <tbody className="font-poppins text-base">
          {servicios.map((servicio) => {
            return (
              <tr
                className={`${
                  seleccionados.includes(servicio.id) ? "bg-rose-200" : ""
                }  border-y border-x-0`}
                key={servicio.id}
              >
                <td className="border-r p-2">
                  <SelectPrograma
                    onchange={(programa) => {
                      updateServicio(servicio.id, {
                        ...servicio,
                        programaPrograma: programa,
                      });
                      setSeleccionados(
                        seleccionados.filter(
                          (seleccionado) => seleccionado !== servicio.id
                        )
                      );
                    }}
                    options={options_programas}
                    default_value={servicio.programaPrograma}
                  />
                </td>
                <td className="border-r p-2">
                  <InputClase
                    onchange={(no_clase) => {
                      updateServicio(servicio.id, {
                        ...servicio,
                        no_clase: no_clase,
                      });
                      setSeleccionados(
                        seleccionados.filter(
                          (seleccionado) => seleccionado !== servicio.id
                        )
                      );
                    }}
                    options={options_clases}
                    setIsAddingClass={setIsAddingClass}
                    isAddingClass={isAddingClass}
                    setClases={setClases}
                    default_value={servicio.no_clase}
                  ></InputClase>
                </td>
                <td className="border-r p-2">
                  <SelectSalon
                    onchange={(salon) => {
                      updateServicio(servicio.id, {
                        ...servicio,
                        salon: salon,
                      });
                      setSeleccionados(
                        seleccionados.filter(
                          (seleccionado) => seleccionado !== servicio.id
                        )
                      );
                    }}
                    options={options_salones}
                    default_value={servicio.salon}
                  />
                </td>
                <td className="border-r p-2">
                  <SelectDia
                    onchange={(dia) => {
                      updateServicio(servicio.id, { ...servicio, dia: dia });
                      setSeleccionados(
                        seleccionados.filter(
                          (seleccionado) => seleccionado !== servicio.id
                        )
                      );
                    }}
                    options={options_dias}
                    default_value={servicio.dia}
                  />
                </td>
                <td className="border-r p-2">
                  <input
                    className="w-full placeholder:text-gray1"
                    type="time"
                    defaultValue={servicio.hora_inicio}
                    onChange={(e) => {
                      updateServicio(servicio.id, {
                        ...servicio,
                        hora_inicio: e.target.value,
                      });
                      setSeleccionados(
                        seleccionados.filter(
                          (seleccionado) => seleccionado !== servicio.id
                        )
                      );
                    }}
                  />
                </td>
                <td className="border-r p-2">
                  <input
                    className="w-full placeholder:text-gray1"
                    type="time"
                    defaultValue={servicio.hora_fin}
                    onChange={(e) => {
                      updateServicio(servicio.id, {
                        ...servicio,
                        hora_fin: e.target.value,
                      });
                      setSeleccionados(
                        seleccionados.filter(
                          (seleccionado) => seleccionado !== servicio.id
                        )
                      );
                    }}
                  />
                </td>
                <td className="border-r p-2">
                  <input
                    className="w-full placeholder:text-gray1"
                    type="time"
                    defaultValue={servicio.hora_servicio_inicio}
                    onChange={(e) => {
                      updateServicio(servicio.id, {
                        ...servicio,
                        hora_servicio_inicio: e.target.value,
                      });
                      setSeleccionados(
                        seleccionados.filter(
                          (seleccionado) => seleccionado !== servicio.id
                        )
                      );
                    }}
                  />
                </td>
                <td className="border-r p-2">
                  <input
                    className="w-full placeholder:text-gray1"
                    type="time"
                    defaultValue={servicio.hora_servicio_fin}
                    onChange={(e) => {
                      updateServicio(servicio.id, {
                        ...servicio,
                        hora_servicio_fin: e.target.value,
                      });
                      setSeleccionados(
                        seleccionados.filter(
                          (seleccionado) => seleccionado !== servicio.id
                        )
                      );
                    }}
                  />
                </td>
                <td className="border-r p-2">
                  <input
                    className="w-full placeholder:text-gray1"
                    type="date"
                    defaultValue={servicio.fecha_inicio}
                    onChange={(e) => {
                      updateServicio(servicio.id, {
                        ...servicio,
                        fecha_inicio: e.target.value,
                      });
                      setSeleccionados(
                        seleccionados.filter(
                          (seleccionado) => seleccionado !== servicio.id
                        )
                      );
                    }}
                  />
                </td>
                <td className="p-2 border-r">
                  <input
                    className="w-full placeholder:text-gray1"
                    type="date"
                    defaultValue={servicio.fecha_fin}
                    onChange={(e) => {
                      updateServicio(servicio.id, {
                        ...servicio,
                        fecha_fin: e.target.value,
                      });
                      setSeleccionados(
                        seleccionados.filter(
                          (seleccionado) => seleccionado !== servicio.id
                        )
                      );
                    }}
                  />
                </td>
                <td className="p-2 border-r">
                  <input
                    className="w-full placeholder:text-gray1"
                    type="number"
                    defaultValue={servicio.num_alumnos}
                    onChange={(e) => {
                      updateServicio(servicio.id, {
                        ...servicio,
                        num_alumnos: e.target.value,
                      });
                    }}
                  />
                </td>
                <td className="p-1 border-r">
                  <button
                    className="text-primary"
                    onClick={() => duplicar_fila(servicio.id)}
                  >
                    Duplicar
                  </button>
                </td>
                <td className="p-1">
                  <button
                    className="text-primary"
                    onClick={() => deleteServicio(servicio.id)}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            );
          })}
          <tr className="border-b p-2 hover:bg-slate-100 rounded-2xl">
            <td className="border-b p-2">
              <button onClick={addServicio} className="text-primary">
                + New
              </button>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}
