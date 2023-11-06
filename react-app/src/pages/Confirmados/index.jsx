import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { useServiciosConfirmados } from "../../hooks/useServiciosConfirmados";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url_backend = import.meta.env.VITE_URL_API;

export default function Confirmados() {
  const { servicios, aprobados } = useServiciosConfirmados();
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState([]);

  const onCheck = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const getAuth = async () => {
    const response = await axios
      .get(url_backend + "/user/auth", { withCredentials: true })
      .then((res) => {
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("rol", res.data.rol);
        localStorage.setItem("nombre", res.data.nombre);
        localStorage.setItem("escuela", res.data.escuela);
        localStorage.setItem("email", res.data.email);
        setLoading(false);
        return res;
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.location.href = "/login";
        }
      });
  };
  useEffect(() => {
    getAuth();
  }, []);

  const onAprobar = () => {
    setIsLoading(true);
    axios
      .patch(
        `${url_backend}/aprobar`,
        {
          servicios: selected,
          servicios_en_revision: servicios.filter(
            (servicio) => !selected.includes(servicio.id)
          ),
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setIsLoading(false);
        window.location.reload();
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };
  return (
    <div className="w-screen flex flex-col items-start">
      <div className="w-full flex justify-between mb-4 fixed flex-wrap bg-white p-8">
        <Header titulo="Servicios confirmados"></Header>
        {aprobados ? null : (
          <button
            className="font-poppins bg-primary text-whiteprimary px-2 rounded-lg ml-1 "
            disabled={isLoading}
            onClick={onAprobar}
          >
            {isLoading ? (
              <div className="m-auto h-2 p-2 w-2 animate-spin rounded-full border-4 border-solid border-whitebg border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            ) : (
              "Enviar"
            )}
          </button>
        )}
      </div>
      <h2 className="mt-24 pl-8 font-poppins font-medium">
        {aprobados
          ? "Da clic para corregir los servicios que estén incorrectos"
          : "Los siguientes servicios son los que se confirmaron con el proveedor. Da clic para seleccionar todos los servicios que estén correctos. Si hay algún servicio que no esté correcto, no lo selecciones y da clic en enviar."}
      </h2>
      <table className="table-auto border-collapse w-full mt-5 ml-8">
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
            <th className="border-r p-2 font-medium">Fecha</th>
            <th className="border-r p-2 font-medium">Número de servicios</th>
          </tr>
        </thead>
        <tbody className="font-poppins text-base">
          {servicios.map((servicio) => {
            return (
              <tr
                className={`border-y border-x-0 cursor-pointer ${
                  aprobados ? " hover:bg-slate-100 " : ""
                }" ${selected.includes(servicio.id) ? " bg-slate-100 " : ""}`}
                key={servicio.id}
                onClick={() => {
                  aprobados
                    ? navigation("/servicio", { state: { id: servicio.id } })
                    : onCheck(servicio.id);
                }}
              >
                <td className="border-r p-2 flex">
                  {selected.includes(servicio.id) ? (
                    <span className="rounded-xl h-6 w-6 shadow-md cursor-pointer bg-primary mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 512 512"
                        id="tick"
                        fill="white"
                      >
                        <path d="M223.9 329.7c-2.4 2.4-5.8 4.4-8.8 4.4s-6.4-2.1-8.9-4.5l-56-56 17.8-17.8 47.2 47.2L340 177.3l17.5 18.1-133.6 134.3z"></path>
                      </svg>
                    </span>
                  ) : null}
                  {servicio.programa}
                </td>
                <td className="border-r p-2">{servicio.no_clase}</td>
                <td className="border-r p-2">{servicio.salon_id}</td>
                <td className="border-r p-2">{servicio.dia}</td>
                <td className="border-r p-2">{servicio.hora_inicio}</td>
                <td className="border-r p-2">{servicio.hora_inicio}</td>
                <td className="border-r p-2">
                  {servicio.hora_servicio_inicio}
                </td>
                <td className="border-r p-2">{servicio.hora_servicio_fin}</td>
                <td className="border-r p-2">{servicio.fecha}</td>
                <td>{servicio.num_servicios}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
