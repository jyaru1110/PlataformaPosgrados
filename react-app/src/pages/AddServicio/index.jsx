import Header from "../../components/Header";
import InputClase from "./components/InputClase";
import SelectSalon from "./components/SelectSalon";
import { useState, useEffect } from "react";
import SelectPrograma from "./components/SelectPrograma";
import { usePrograma } from "../../hooks/usePrograma";
import { programas_to_correct_format } from "../../utils/programas_to_correct_format";
import { useSalones } from "../../hooks/useSalones";
import { salones_to_correct_format } from "../../utils/salones_to_correct_format";
import { useClases } from "../../hooks/useClases";
import { clases_to_correct_format } from "../../utils/clases_to_correct_format";
import SelectDia from "./components/SelectDia";
import { post_axios } from "../../hooks/post_axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function AddServicio() {
  const [servicios, setServicios] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const url_backend = import.meta.env.VITE_URL_API;

  const options_dias = [
    { value: "Lunes" },
    { value: "Martes" },
    { value: "Miercoles" },
    { value: "Jueves" },
    { value: "Viernes" },
    { value: "Sabado" },
  ];

  const clases = useClases();
  const options_clases = clases_to_correct_format(clases);

  const salones = useSalones();
  const options_salones = salones_to_correct_format(salones);

  const programas = usePrograma("Todos");
  const options_programas = programas_to_correct_format(programas);

  const send_servicios = () => {
    setIsLoading(true);
    const hoy = new Date();
    const string_hoy = hoy.toISOString().substring(0, 10);
    servicios.length === 0 ? toast.error("No hay servicios") : null;
    servicios.forEach((servicio) => {
      if (
        servicio.programa === "" ||
        servicio.no_clase === "" ||
        servicio.salon === "" ||
        servicio.dia === "" ||
        servicio.hora_inicio === "" ||
        servicio.hora_fin === "" ||
        servicio.fecha_inicio === "" ||
        servicio.fecha_fin === ""
      ) {
        seleccionados.includes(servicio.id)
          ? null
          : setSeleccionados([...seleccionados, servicio.id]);
        toast.error("Faltan campos por llenar");
        return;
      }
      if (servicio.fecha_inicio <= string_hoy) {
        seleccionados.includes(servicio.id)
          ? null
          : setSeleccionados([...seleccionados, servicio.id]);
        toast.error("La fecha de inicio no puede ser hoy o antes");
        return;
      }
      if (servicio.fecha_fin < servicio.fecha_inicio) {
        seleccionados.includes(servicio.id)
          ? null
          : setSeleccionados([...seleccionados, servicio.id]);
        toast.error(
          "La fecha de fin no puede ser menor o igual a la fecha de inicio"
        );
        return;
      }
      if (servicio.hora_fin <= servicio.hora_inicio) {
        seleccionados.includes(servicio.id)
          ? null
          : setSeleccionados([...seleccionados, servicio.id]);
        toast.error("La hora de fin no puede ser menor a la hora de inicio");
        return;
      }

      const response = post_axios(url_backend + "/create_horario", servicio);
      response.then((data) => {
        setIsLoading(false);
        if (data.status === 200 && data.data.notificacion) {
          toast.info("Solicitud de servicios enviada");
        } else if (data.status === 200 && data.data.horario) {
          toast.success("Servicios creados");
        } else {
          toast.error("Error al crear servicios");
        }
      });
    });
  };

  const addServicio = () => {
    setServicios([
      ...servicios,
      {
        id: servicios.length,
        programa: "",
        no_clase: "",
        salon: "",
        dia: "",
        hora_inicio: "",
        hora_fin: "",
        fecha_inicio: "",
        fecha_fin: "",
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
      <div className="w-11/12 flex justify-between mb-4 fixed flex-wrap">
        <Header titulo="Añadir servicio"></Header>
        <button
          className="font-poppins bg-primary text-whiteprimary px-2 rounded-lg ml-1 "
          onClick={send_servicios}
        >
          {isLoading ? (
            <div className="m-auto h-2 p-2 w-2 animate-spin rounded-full border-4 border-solid border-whitebg border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          ) : (
            "Crear servicios"
          )}
        </button>
      </div>
      <table className="table-auto border-collapse w-full mt-14">
        <thead className="">
          <tr className="text-left border-y border-x-0">
            <th className="border-r font-medium p-2">Programa</th>
            <th className="border-r font-medium p-2">Clase</th>
            <th className="border-r p-2 font-medium">Salon</th>
            <th className="border-r p-2 font-medium">Dia</th>
            <th className="border-r p-2 font-medium">Hora inicio</th>
            <th className="border-r p-2 font-medium">Hora fin</th>
            <th className="border-r p-2 font-medium">Fecha inicio</th>
            <th className="p-2 font-medium">Fecha fin</th>
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
                        programa: programa,
                      });
                      setSeleccionados(
                        seleccionados.filter(
                          (seleccionado) => seleccionado !== servicio.id
                        )
                      );
                    }}
                    options={options_programas}
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
                  />
                </td>
                <td className="border-r p-2">
                  <input
                    className="w-full placeholder:text-gray1"
                    type="time"
                    placeholder="Hora inicio"
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
                    placeholder="Hora fin"
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
                    type="date"
                    placeholder="Fecha inicio"
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
                    placeholder="Fecha fin"
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
                <td className="p-2">
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
          <tr className="border-b p-2">
            <td className="border-b p-2">
              <button onClick={addServicio} className="text-primary">
                + New
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}
