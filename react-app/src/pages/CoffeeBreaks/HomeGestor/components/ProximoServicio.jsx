import { useProximoServicio } from "../../../../hooks/useProximoServicio";
import { get_numero_dia, get_month_short } from "../../../../utils/date_to_string";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const url_backend = import.meta.env.VITE_URL_API;

export default function ProximoServicio() {
  const navigation = useNavigate();
  const resultado = useProximoServicio();
  const servicio = resultado.servicio;
  const loading = resultado.loading;

  const changeRol = (rol) => {
    console.log(url_backend);
    const url =`${url_backend}${rol == "Gestor" ? "/user/usuario/" : "/user/gestor/"}${localStorage.getItem("id")}`;

    console.log(url)
    axios
      .put(
        url,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      });
  };
  return (
    <div className="md:w-2/5 pt-2 md:relative fixed w-11/12 bg-white z-10">
      <div className="flex items-center mb-2 m-auto justify-between sm:mr-0 sm:w-full">
        <h1 className="font-poppins font-semibold text-sm ml-2.5">
          Bienvenido{"(a)"} {localStorage.getItem("nombre")?.split(" ")[0]}{" "}
          {localStorage.getItem("nombre")?.split(" ")[1]}
        </h1>
        <div
          className="bg-blue-100 text-blue-900 font-poppins font-semibold text-center text-xs px-2 py-1 rounded-xl cursor-pointer"
          onClick={() => {
            localStorage.getItem("id") == 184 || localStorage.getItem("id") == 183
              ? changeRol(localStorage.getItem("rol"))
              : null;
          }}
        >
          {localStorage.getItem("rol") == "Gestor"
            ? localStorage.getItem("rol")
            : localStorage.getItem("escuela")}
        </div>
      </div>
      <div className="m-auto rounded-3xl flex flex-col bg-primary justify-between sm:my-0 md:ml-1 sm:mr-0 sm:w-full">
        <h1 className="font-poppins pl-4 pt-4 font-medium text-whiteprimary ml-1 text-lg mb-2">
          Próximo servicio
        </h1>
        {loading ? (
          <div className="m-auto h-8 p-4 mb-4 w-8 animate-spin rounded-full border-4 border-solid border-whitebg border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        ) : (
          <>
            {servicio ? (
              <div className="w-full px-4 m-auto flex-grow flex mb-4 justify-between">
                <div className="rounded-xl bg-whitebg flex items-center flex-col justify-center mr-2">
                  <p className="text-base text-whiteprimary font-poppins mx-4 font-medium">
                    {get_numero_dia(servicio.fecha)}
                  </p>
                  <p className="text-xs text-gray2 font-poppins font-regular">
                    {get_month_short(servicio.fecha)}
                  </p>
                </div>
                <div
                  className="text-whitebg rounded-xl bg-whitebg text-sm flex flex-col justify-center p-2 grow"
                  onClick={() => {
                    navigation("/servicio", { state: { id: servicio.id } });
                  }}
                >
                  <p className="text-sm text-whiteprimary font-poppins font-medium">
                    {servicio.hora_servicio_inicio.substring(0, 5)} -{" "}
                    {servicio.hora_servicio_fin.substring(0, 5)}
                  </p>
                  <p className="text-sm text-gray2 font-poppins font-regular">
                    Salón {servicio.salon_id}
                  </p>
                  <p className="text-sm text-gray2 font-poppins font-regular">
                    {servicio.codigo}
                  </p>
                </div>
                <div className="rounded-xl bg-whitebg flex items-center px-1 flex-col justify-center ml-2">
                  {servicio.num_servicios > 0 ? (
                    <p className="text-base text-whiteprimary font-poppins mx-4 font-medium">
                      {servicio.num_servicios}
                    </p>
                  ) : (
                    <p className="text-base text-whiteprimary font-poppins mx-4 font-medium">
                      0
                    </p>
                  )}
                  <p className="text-xs text-gray2 font-poppins font-regular">
                    servicios
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full px-4 m-auto flex mb-4 flex-grow justify-between">
                <div className="rounded-xl bg-whitebg flex items-center flex-col justify-center mr-2">
                  <p className="text-base text-whiteprimary font-poppins mx-4 font-medium">
                    -
                  </p>
                  <p className="text-xs text-gray2 font-poppins font-regular">
                    -
                  </p>
                </div>
                <div className="text-whitebg rounded-xl bg-whitebg text-sm flex flex-col justify-center p-2 grow">
                  <p className="text-base text-whiteprimary font-poppins font-medium">
                    No hay servicios hoy
                  </p>
                </div>
                <div className="rounded-xl bg-whitebg flex items-center px-1 flex-col justify-center ml-2">
                  <p className="text-base text-whiteprimary font-poppins mx-4 font-medium">
                    -
                  </p>
                  <p className="text-xs text-gray2 font-poppins font-regular">
                    -
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
