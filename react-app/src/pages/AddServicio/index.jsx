import Header from "../../components/Header";
import InputClase from "./InputClase";
export default function AddServicio() {
  return (
    <div className="w-screen flex flex-col items-start p-8">
      <Header titulo="Añadir servicio"></Header>
      <table className="table-auto border-collapse w-full">
        <thead className="">
          <tr className="text-left border-y border-x-0">
            <th className="border-r p-2">Escuela</th>
            <th className="border-r p-2">Clase</th>
            <th className="border-r p-2">Salon</th>
            <th className="border-r p-2">Dia</th>
            <th className="border-r p-2">Hora inicio</th>
            <th className="border-r p-2">Hora fin</th>
            <th className="border-r p-2">Fecha inicio</th>
            <th className="p-2">Fecha fin</th>
          </tr>
        </thead>
        <tbody className="">
          <tr className="border-y border-x-0">
            <td className="border-r p-2">
              <input className="w-full" type="text" placeholder="Escuela" />
            </td>
            <td className="border-r p-2">
              <InputClase></InputClase>
            </td>
            <td className="border-r p-2">
              <input className="w-full" type="text" placeholder="Salon" />
            </td>
            <td className="border-r p-2">
              <input className="w-full" type="text" placeholder="Dia" />
            </td>
            <td className="border-r p-2">
              <input className="w-full" type="time" placeholder="Hora inicio" />
            </td>
            <td className="border-r p-2">
              <input className="w-full" type="time" placeholder="Hora fin" />
            </td>
            <td className="border-r p-2">
              <input className="w-full" type="date" placeholder="Fecha inicio" />
            </td>
            <td className="p-2">
              <input
                className="w-full"
                type="date"
                placeholder="Fecha fin"
              />
              </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
