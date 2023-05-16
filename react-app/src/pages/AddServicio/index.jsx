import Header from "../../components/Header";
import InputClase from "./components/InputClase";
import { useState,useEffect } from "react";
import SelectPrograma from "./components/SelectPrograma";
export default function AddServicio() {
  const [servicios, setServicios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(servicios);
  }, [servicios]);

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
  };

  return (
    <div className="w-screen flex flex-col items-start p-8">
      <Header titulo="Añadir servicio"></Header>
      <table className="table-auto border-collapse w-full">
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
            <tr className="border-y border-x-0" key={servicio.id}>
              <td className="border-r p-2">
                <SelectPrograma onchange={(programa)=>{
                  updateServicio(servicio.id, {...servicio, programa:programa})
                }}/>
              </td>
              <td className="border-r p-2">
                <InputClase onchange={(clase)=>{
                  updateServicio(servicio.id, {...servicio, clase:clase})
                }}>
                </InputClase>
              </td>
              <td className="border-r p-2">
                <input
                  className="w-full placeholder:text-gray1"
                  type="text"
                  placeholder="Salon"
                />
              </td>
              <td className="border-r p-2">
                <input
                  className="w-full placeholder:text-gray1"
                  type="text"
                  placeholder="Dia"
                />
              </td>
              <td className="border-r p-2">
                <input
                  className="w-full placeholder:text-gray1"
                  type="time"
                  placeholder="Hora inicio"
                />
              </td>
              <td className="border-r p-2">
                <input
                  className="w-full placeholder:text-gray1"
                  type="time"
                  placeholder="Hora fin"
                />
              </td>
              <td className="border-r p-2">
                <input
                  className="w-full placeholder:text-gray1"
                  type="date"
                  placeholder="Fecha inicio"
                />
              </td>
              <td className="p-2">
                <input
                  className="w-full placeholder:text-gray1"
                  type="date"
                  placeholder="Fecha fin"
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
