import Header from "../../components/Header";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
const solicitudes = [
  {
    id: 1,
  },
];

export default function Solicitudes() {
  const [isLoading, setIsLoading] = useState(false);
  const [seleccionados, setSeleccionados] = useState([]);
  const onCheck = (id) => {
    if (seleccionados.includes(id)) {
      setSeleccionados(seleccionados.filter((item) => item !== id));
    } else {
      setSeleccionados([...seleccionados, id]);
    }
  };
  useEffect(() => {
    console.log(seleccionados);
  }, [seleccionados]);

  return (
    <div className="w-screen flex flex-col items-start p-8">
      <div className="w-11/12 flex justify-between mb-4 fixed flex-wrap">
        <Header titulo="Solicitudes"></Header>
      </div>
      <table className="table-auto border-collapse w-full mt-14">
        <thead className="bg-slate-100 font-poppins">
          <tr className="text-left border-y border-x-0">
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
        <tbody className="font-poppins text-base">
          {solicitudes.map((solicitud) => {
            return (
              <tr className="border-y border-x-0" key={solicitud.id}>
                <td className="border-r p-2"></td>
                <td className="border-r p-2"></td>
                <td className="border-r p-2"></td>
                <td className="border-r p-2"></td>
                <td className="border-r p-2"></td>
                <td className="border-r p-2"></td>
                <td className="border-r p-2"></td>
                <td className="border-r p-2"></td>
                <td className="border-r p-2"></td>
                <td className="border-r p-2"></td>
                <td className="border-r p-2"></td>
                <td className="border-r p-2"></td>
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
      </table>
      <ToastContainer />
    </div>
  );
}
