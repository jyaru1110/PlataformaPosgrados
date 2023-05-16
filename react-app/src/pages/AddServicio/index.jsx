import Header from "../../components/Header";
import InputClase from "./components/InputClase";
import SelectSalon from "./components/SelectSalon";
import { useState,useEffect } from "react";
import SelectPrograma from "./components/SelectPrograma";
import { usePrograma } from "../../hooks/usePrograma";
import { programas_to_correct_format } from "../../utils/programas_to_correct_format";
import { useSalones } from "../../hooks/useSalones";
import {salones_to_correct_format} from "../../utils/salones_to_correct_format";
import { useClases } from "../../hooks/useClases";
import { clases_to_correct_format } from "../../utils/clases_to_correct_format";
import SelectDia from "./components/SelectDia";
export default function AddServicio() {
  const [servicios, setServicios] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const options_dias = [
    { value: "Lunes" },
    { value: "Martes"},
    { value: "Miercoles"},
    { value: "Jueves"},
    { value: "Viernes"},
    { value: "Sabado"},
  ]

  const clases = useClases();
  const options_clases = clases_to_correct_format(clases);

  const salones = useSalones();
  const options_salones = salones_to_correct_format(salones);

  const programas = usePrograma("Todos");
  const options_programas = programas_to_correct_format(programas);

  useEffect(() => {
    console.log(servicios);
  }, [servicios]);

  const send_servicios = () => {
    servicios.forEach((servicio) => {
      if(servicio.programa==="" || servicio.clase==="" || servicio.salon==="" || servicio.dia==="" || servicio.horaInicio==="" || servicio.horaFin==="" || servicio.fechaInicio==="" || servicio.fechaFin===""){
        seleccionados.includes(servicio.id)?{}:setSeleccionados([...seleccionados, servicio.id]);
        return;
      }
    });
  };

  const addServicio = () => {
    setServicios([
      ...servicios,
      {
        id: servicios.length,
        programa: "",
        clase: "",
        salon: "",
        dia: "",
        horaInicio: "",
        horaFin: "",
        fechaInicio: "",
        fechaFin: "",
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
    setSeleccionados(seleccionados.filter((seleccionado)=>seleccionado!==id));
  };

  return (
    <div className="w-screen flex flex-col items-start p-8">
      <div className="w-11/12 flex justify-between mb-4 fixed">
        <Header titulo="Añadir servicio"></Header>
        <button className="font-poppins bg-primary text-white px-2 rounded-lg ml-1" onClick={send_servicios}>Crear nuevos servicios</button>
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
            <tr className={`${seleccionados.includes(servicio.id)?"bg-rose-200":""}  border-y border-x-0`} key={servicio.id}>
              <td className="border-r p-2">
                <SelectPrograma onchange={(programa)=>{
                  updateServicio(servicio.id, {...servicio, programa:programa});
                  setSeleccionados(seleccionados.filter((seleccionado)=>seleccionado!==servicio.id));
                }} options={options_programas}/>
              </td>
              <td className="border-r p-2">
                <InputClase onchange={(clase)=>{
                  updateServicio(servicio.id, {...servicio, clase:clase})
                }} options={options_clases}>
                </InputClase>
              </td>
              <td className="border-r p-2">
                <SelectSalon onchange={(salon)=>{
                  updateServicio(servicio.id, {...servicio, salon:salon})
                }} options={options_salones}/>

              </td>
              <td className="border-r p-2">
                <SelectDia onchange={(dia)=>{
                  updateServicio(servicio.id, {...servicio, dia:dia})
                }} options={options_dias}/>
              </td>
              <td className="border-r p-2">
                <input
                  className="w-full placeholder:text-gray1"
                  type="time"
                  placeholder="Hora inicio"
                  onChange={(e)=>{
                    updateServicio(servicio.id, {...servicio, horaInicio:e.target.value})
                  }}
                />
              </td>
              <td className="border-r p-2">
                <input
                  className="w-full placeholder:text-gray1"
                  type="time"
                  placeholder="Hora fin"
                  onChange = {(e)=>{
                    updateServicio(servicio.id, {...servicio, horaFin:e.target.value})
                  }}
                />
              </td>
              <td className="border-r p-2">
                <input
                  className="w-full placeholder:text-gray1"
                  type="date"
                  placeholder="Fecha inicio"
                  onChange = {(e)=>{
                    updateServicio(servicio.id, {...servicio, fechaInicio:e.target.value})
                  }}
                />
              </td>
              <td className="p-2 border-r">
                <input
                  className="w-full placeholder:text-gray1"
                  type="date"
                  placeholder="Fecha fin"
                  onChange={(e)=>{
                    updateServicio(servicio.id, {...servicio, fechaFin:e.target.value})
                  }
                  }
                />
              </td>
              <td className="p-2">
                <button className="text-primary" onClick={()=>deleteServicio(servicio.id)}>Borrar</button>
              </td>
            </tr>
            );
          })}
          <tr className="border-b p-2">
            <td className="border-b p-2">
              <button onClick={addServicio} className="text-primary">+ New</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
