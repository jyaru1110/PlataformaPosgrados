import Main from "../../../components/Main";
import Header from "../../../components/Header";
import Form from "../../../components/Form";
import { useParams } from "react-router-dom";
import { usePrograma } from "../../../../../hooks/useProgramas";
import Table from "../../../components/Table";
import Error from "../../../components/Error";
import { useForm } from "react-hook-form";
import { useRef, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const headers_costos = [
  "Año",
  "Mensualidades",
  "Monto mensual",
  "Costo crédito",
  "Inscripción",
  "Programa",
  "Total",
];

export default function Programa() {
  const { programa } = useParams();
  const { loading, programaData, error } = usePrograma(programa);
  const refSubmit = useRef(null);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    await axios
      .patch(`${import.meta.env.VITE_URL_API}/programa/${programa}`, data, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  useEffect(() => {
    if (programaData) {
      const programa_reset = Object.keys(programaData).reduce((acc, key) => {
        if (
          key === "costos_programas" ||
          key === "aperturas_cierres" ||
          key === "puesto_programas"
        ) {
          return acc;
        }
        return { ...acc, [key]: programaData[key] };
      }, {});
      reset(programa_reset);
    }
  }, [programaData]);

  return (
    <div className="w-full flex flex-col relative h-screen">
      {error ? (
        <Error err={error} />
      ) : (
        <>
          <Header title={programa}>
            <button
              onClick={() => {
                refSubmit.current.click();
              }}
            >
              <svg
                width="24"
                height="19"
                viewBox="0 0 24 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.7328 4.99962C18.9989 3.33099 17.7323 1.94649 16.1271 1.05827C14.5219 0.170059 12.6666 -0.172873 10.8456 0.0820302C9.02452 0.336933 7.33819 1.17561 6.04496 2.46954C4.75173 3.76347 3.92295 5.44128 3.68561 7.24586C2.54043 7.51722 1.53584 8.19527 0.862625 9.15123C0.189406 10.1072 -0.105557 11.2745 0.0337506 12.4315C0.173058 13.5885 0.736934 14.6545 1.6183 15.4272C2.49966 16.1999 3.63712 16.6255 4.81468 16.623C5.13325 16.623 5.43876 16.4978 5.66402 16.2749C5.88927 16.052 6.01582 15.7497 6.01582 15.4345C6.01582 15.1193 5.88927 14.817 5.66402 14.5942C5.43876 14.3713 5.13325 14.2461 4.81468 14.2461C4.17756 14.2461 3.56653 13.9956 3.11602 13.5499C2.6655 13.1041 2.41241 12.4995 2.41241 11.8691C2.41241 11.2387 2.6655 10.6341 3.11602 10.1883C3.56653 9.74253 4.17756 9.4921 4.81468 9.4921C5.13325 9.4921 5.43876 9.36689 5.66402 9.144C5.88927 8.92112 6.01582 8.61882 6.01582 8.30362C6.01889 6.89797 6.52545 5.5389 7.4455 4.46787C8.36555 3.39684 9.63952 2.6832 11.0411 2.45373C12.4426 2.22426 13.881 2.49382 15.1007 3.21452C16.3204 3.93523 17.2424 5.0604 17.7029 6.39015C17.7716 6.59438 17.895 6.77633 18.06 6.91657C18.225 7.05682 18.4254 7.15009 18.6398 7.18644C19.4398 7.33603 20.1651 7.74931 20.6974 8.35892C21.2297 8.96853 21.5376 9.73855 21.571 10.5435C21.6045 11.3484 21.3614 12.1408 20.8815 12.7916C20.4015 13.4424 19.713 13.9132 18.9281 14.1272C18.6191 14.206 18.3543 14.403 18.1922 14.675C18.03 14.9469 17.9836 15.2714 18.0632 15.5772C18.1429 15.8829 18.342 16.1448 18.6168 16.3053C18.8916 16.4658 19.2196 16.5117 19.5286 16.4329C20.7927 16.1024 21.9132 15.3727 22.7201 14.3548C23.5269 13.3368 23.976 12.0861 23.9991 10.7926C24.0222 9.49915 23.618 8.23355 22.8481 7.18801C22.0781 6.14247 20.9843 5.37411 19.7328 4.99962ZM12.8743 7.45979C12.7601 7.35159 12.6254 7.26677 12.4779 7.21021C12.1855 7.09134 11.8575 7.09134 11.5651 7.21021C11.4176 7.26677 11.2829 7.35159 11.1687 7.45979L7.56529 11.0253C7.33911 11.249 7.21205 11.5526 7.21205 11.8691C7.21205 12.1856 7.33911 12.4891 7.56529 12.7129C7.79147 12.9367 8.09823 13.0624 8.4181 13.0624C8.73796 13.0624 9.04473 12.9367 9.27091 12.7129L10.8204 11.1679V17.8115C10.8204 18.1267 10.9469 18.429 11.1722 18.6519C11.3974 18.8748 11.703 19 12.0215 19C12.3401 19 12.6456 18.8748 12.8708 18.6519C13.0961 18.429 13.2227 18.1267 13.2227 17.8115V11.1679L14.7721 12.7129C14.8838 12.8243 15.0166 12.9127 15.163 12.9731C15.3094 13.0334 15.4664 13.0645 15.6249 13.0645C15.7835 13.0645 15.9405 13.0334 16.0869 12.9731C16.2332 12.9127 16.3661 12.8243 16.4777 12.7129C16.5903 12.6024 16.6797 12.471 16.7407 12.3261C16.8016 12.1813 16.833 12.026 16.833 11.8691C16.833 11.7122 16.8016 11.5568 16.7407 11.412C16.6797 11.2672 16.5903 11.1357 16.4777 11.0253L12.8743 7.45979Z"
                  fill="black"
                />
              </svg>
            </button>
          </Header>
          <Main>
            <Form
              title={programa}
              register={register("programa")}
              onSubmit={handleSubmit(onSubmit)}
            >
              <p className="font-bold">Código</p>
              <input
                {...register("codigo")}
                defaultValue={programaData.codigo}
              ></input>
              <p className="font-bold">E/F</p>
              <input
                {...register("escuela")}
                defaultValue={programaData.escuela}
              ></input>
              <p className="font-bold">Grado</p>
              <input
                {...register("grado")}
                defaultValue={programaData.grado}
              ></input>
              <p className="font-bold">Duración</p>
              <input
                {...register("duracion")}
                defaultValue={programaData.duracion}
              ></input>
              <p className="font-bold">Créditos</p>
              <input
                {...register("creditos")}
                defaultValue={programaData.creditos}
              ></input>
              <p className="font-bold">Año inicio</p>
              <input
                {...register("year_inicio")}
                defaultValue={programaData.year_inicio}
              ></input>
              <p className="font-bold"># Materias</p>
              <input
                {...register("num_materias")}
                defaultValue={programaData.num_materias}
              ></input>
              <p className="font-bold"># Materias en inglés</p>
              <input
                {...register("num_materias_ingles")}
                defaultValue={programaData.num_materias_ingles}
              ></input>
              <p className="font-bold">RVOE</p>
              <input
                {...register("rvoe")}
                defaultValue={programaData.rvoe}
              ></input>
              <p className="font-bold">Fecha RVOE</p>
              <input
                type="date"
                {...register("fecha_rvoe")}
                defaultValue={programaData.fecha_rvoe}
              ></input>
              <p className="font-bold">Modalidad</p>
              <input
                {...register("modalidad")}
                defaultValue={programaData.modalidad}
              ></input>
              <p className="font-bold">Campus</p>
              <input
                {...register("campus")}
                defaultValue={programaData.campus}
              ></input>
              <p className="font-bold">Está activo</p>
              <input
                type="checkbox"
                {...register("esta_activo")}
                defaultValue={programaData.esta_activo}
              ></input>
              <button
                className="invisible"
                type="submit"
                ref={refSubmit}
              ></button>
            </Form>
            <h2 className="text-xl font-bold my-5 ml-1">Costos</h2>
            <Table headers={headers_costos} loading={loading}>
              {programaData.costos_programas?.map((costo, index) => {
                return (
                  <tr
                    className="border-b border-grayborder hover:bg-grayborder transition-all ease-in-out duration-300"
                    key={index}
                  >
                    <td className="px-2 py-1">{costo.year}</td>
                    <td className="px-2 py-1">{costo.num_mensualidades}</td>
                    <td className="px-2 py-1">{costo.monto_mensual.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}</td>
                    <td className="px-2 py-1">
                      {programaData.creditos
                        ?  ((costo.num_mensualidades * costo.monto_mensual +
                            costo.costo_inscripcion) /
                            programaData.creditos).toLocaleString('en-US', { style: 'currency', currency: 'USD'})
                        : "NA"}
                    </td>
                    <td className="px-2 py-1">{costo.costo_inscripcion.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}</td>
                    <td className="px-2 py-1">
                      {(costo.num_mensualidades * costo.monto_mensual).toLocaleString('en-US', { style: 'currency', currency: 'USD'})}
                    </td>
                    <td className="px-2 py-1">
                      {(costo.num_mensualidades * costo.monto_mensual +
                        costo.costo_inscripcion).toLocaleString('en-US', { style: 'currency', currency: 'USD'})}
                    </td>
                  </tr>
                );
              })}
            </Table>
            <h2 className="text-xl font-bold my-5 ml-1">Aperturas y cierres</h2>
            <Table
              headers={["Fecha inicio", "Fecha fin", "Term"]}
              loading={loading}
            >
              {programaData.aperturas_cierres?.map((apertura, index) => {
                return (
                  <tr
                    className="border-b border-grayborder hover:bg-grayborder transition-all ease-in-out duration-300"
                    key={index}
                  >
                    <td className="px-2 py-1">
                      {apertura.fecha_inicio.substring(0, 10)}
                    </td>
                    <td className="px-2 py-1">
                      {apertura.fecha_fin.substring(0, 10)}
                    </td>
                    <td className="px-2 py-1">{apertura.term}</td>
                  </tr>
                );
              })}
            </Table>
            <h2 className="text-xl font-bold my-5 ml-1">Puestos</h2>
            <Table headers={["Persona", "Puesto"]} loading={loading}>
              {programaData.puesto_programas?.map((puesto, index) => {
                return (
                  <tr
                    className="border-b border-grayborder hover:bg-grayborder transition-all ease-in-out duration-300"
                    key={index}
                  >
                    <td className="px-2 py-1 underline text-emerald-800 flex items-center space-x-2"><img height={20} width={20} className="rounded-full" src={puesto.usuario?.foto}></img><Link to={`/micrositio/admin/personas/${puesto.usuarioId}`}>{puesto.usuario.nombre}</Link></td>
                    <td className="px-2 py-1">{puesto.puesto}</td>
                  </tr>
                );
              })}
            </Table>
          </Main>
        </>
      )}
      <ToastContainer />
    </div>
  );
}