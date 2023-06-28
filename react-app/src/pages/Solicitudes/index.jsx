import Header from "../../components/Header";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import { useSolicitudes } from "../../hooks/useSolicitudes";
const solicitudes = [
  {
    id: 1,
  },
];

export default function Solicitudes() {
  const [seleccionados, setSeleccionados] = useState([]);
  const resultado = useSolicitudes();
  const solicitudes = resultado.solicitudes;
  const loading = resultado.loading;
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

        {loading ? (
          <div className="m-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        ) : (
          <tbody className="font-poppins text-base">
            {solicitudes.map((solicitud) => {
              return (
                <tr className={`${solicitud.estado=="Aceptado"?"bg-green-50":(solicitud.estado=="Rechazado"?"bg-red-50":"")} border-x-0 border-y`} key={solicitud.id}>
                  <td className="border-r p-2">{solicitud.nombre}</td>
                  <td className="border-r p-2">{solicitud.salon}</td>
                  <td className="border-r p-2">{solicitud.programa}</td>
                  <td className="border-r p-2">{solicitud.fecha_inicio}</td>
                  <td className="border-r p-2">{solicitud.fecha_fin}</td>
                  <td className="border-r p-2">{solicitud.hora_inicio}</td>
                  <td className="border-r p-2">{solicitud.hora_fin}</td>
                  <td className="border-r p-2">{solicitud.hora_servicio_inicio}</td>
                  <td className="border-r p-2">{solicitud.hora_servicio_fin}</td>
                  <td className="border-r p-2">{solicitud.no_clase}</td>
                  <td className="border-r p-2">{solicitud.dia}</td>
                  <td className="border-r p-2">{solicitud.num_alumnos}</td>
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
        )}
      </table>
      <ToastContainer />
    </div>
  );
}
