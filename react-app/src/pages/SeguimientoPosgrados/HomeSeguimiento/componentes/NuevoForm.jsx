import { useState } from "react";
import { post_axios } from "../../../../hooks/post_axios";
import ProgramaInput from "./ProgramaInput";
import TipoActualizacion from "./TipoActualizacion";
import { useForm } from "react-hook-form";
import NombrePrograma from "./NombrePrograma";
import EscuelaInput from "./EscuelaInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const url_backend = import.meta.env.VITE_URL_API;

export default function NuevoForm(props) {
  const [tipo, setTipo] = useState("choose");
  const [tipoActualizacion, setTipoActualizacion] = useState("choose");
  toast.onChange((payload) => {
    if (payload.type === "success" && payload.status === "removed") {
      window.location.reload();
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    data.tipo_proceso = tipo;
    if (
      data.tipo == "" ||
      data.tipo == " " ||
      data.tipo == "choose" ||
      data.grado == "" ||
      data.grado == " " ||
      data.grado == "choose" ||
      data.modalidad == "" ||
      data.modalidad == " " ||
      data.modalidad == "choose" ||
      data.duracion == "" ||
      data.duracion == " " ||
      data.duracion <= 0 ||
      data.escuela == "" ||
      data.escuela == " " ||
      data.escuela == "choose" ||
      data.programa == "" ||
      data.programa == " " ||
      data.programa == "choose" ||
      data.codigo == "" ||
      data.codigo == " " ||
      data.tipo_proceso == "choose" ||
      data.tipo_proceso == "" ||
      data.tipo_proceso == " " ||
      data.programa_origen == "" ||
      data.programa_origen == " " ||
      data.programa_origen == "choose" ||
      data.programa_destino == "" ||
      data.programa_destino == " " ||
      data.programa_destino == "choose" ||
      data.programa_origen == "Todos"
    ) {
      toast.error("Por favor llena todos los campos");
      return;
    }

    post_axios(url_backend + "/procesos", data).then((res) => {
      if (res.status == 200) {
        toast.success("Proceso creado correctamente");
      }
    }).catch((err) => {
      toast.error("Error al crear el proceso");
    });
  };

  return (
    <div
      className={`h-screen w-screen fixed flex items-center justify-center z-10 p-5 ${
        props.show ? "" : " hidden"
      }`}
    >
      <div
        className={`h-full w-full bg-black/[0.14] fixed z-40`}
        onClick={() => props.setShow(false)}
      ></div>
      <div className="w-full h-full bg-white max-w-2xl max-h-[700px] rounded-xl flex flex-col justify-center items-center p-7 z-50">
        {tipo == "choose" ? (
          <>
            <button
              className="font-seravek font-medium text-2xl bg-headerbg w-full py-20 rounded-2xl hover:bg-primary hover:text-white transition-colors ease-in-out duration-200 mb-10"
              onClick={() => setTipo("nuevo")}
            >
              NUEVO PROGRAMA
            </button>
            <button
              className="font-seravek font-medium text-2xl bg-headerbg w-full py-20 rounded-2xl hover:bg-primary hover:text-white transition-colors ease-in-out duration-200"
              onClick={() => setTipo("actualizacion")}
            >
              ACTUALIZACIÓN DE PROGRAMA
            </button>
          </>
        ) : (
          <>
            {tipo == "actualizacion" ? (
              <div className="w-full h-full flex flex-col font-seravek justify-start">
                <div className="flex items-center font-medium w-full">
                  <button
                    onClick={() => setTipo("choose")}
                    className="justify-self-start"
                  >
                    <svg
                      width="8"
                      height="14"
                      viewBox="0 0 8 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.53739 13.2501C7.7702 13.0159 7.90088 12.6991 7.90088 12.3689C7.90088 12.0386 7.7702 11.7218 7.53739 11.4876L3.11239 7.00012L7.53739 2.57512C7.7702 2.34092 7.90088 2.0241 7.90088 1.69387C7.90088 1.36364 7.7702 1.04682 7.53739 0.812619C7.42118 0.695458 7.28293 0.602465 7.13061 0.539004C6.97829 0.475544 6.8149 0.442871 6.64989 0.442871C6.48487 0.442871 6.32149 0.475544 6.16917 0.539004C6.01684 0.602465 5.87859 0.695458 5.76239 0.812619L0.462389 6.11262C0.345228 6.22882 0.252235 6.36707 0.188775 6.5194C0.125314 6.67172 0.0926406 6.8351 0.0926406 7.00012C0.0926406 7.16513 0.125314 7.32852 0.188775 7.48084C0.252235 7.63316 0.345228 7.77142 0.462389 7.88762L5.76239 13.2501C5.87859 13.3673 6.01684 13.4603 6.16917 13.5237C6.32149 13.5872 6.48487 13.6199 6.64989 13.6199C6.8149 13.6199 6.97829 13.5872 7.13061 13.5237C7.28293 13.4603 7.42118 13.3673 7.53739 13.2501Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                  <h1 className="text-xl ml-2 justify-self-center w-full text-center">
                    ACTUALIZACIÓN DE PROGRAMA
                  </h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <p className="text-lg font-medium mt-4 ml-1">De</p>
                  <ProgramaInput register={register} nombre="programa_origen" />
                  <p className="text-lg font-medium ml-1">A</p>
                  <TipoActualizacion
                    register={register}
                    nombre="programa_destino"
                    onchange={setTipoActualizacion}
                  />
                  {tipoActualizacion == "nuevo" ? (
                    <>
                      <p className="text-lg font-medium ml-1">
                        Nombre del programa
                      </p>
                      <NombrePrograma register={register} nombre="programa" />
                      <div className="flex space-x-4">
                        <div className="w-full">
                          <p className="text-lg font-medium ml-1">Código</p>
                          <input
                            placeholder="Escribe el codigo del programa"
                            className="w-full font-seravek text-base h-10 bg-headerbg text-textform rounded-xl px-2.5 mb-2"
                            {...register("codigo")}
                          />
                        </div>
                        <div className="w-full">
                          <p className="text-lg font-medium ml-1">Escuela</p>
                          <EscuelaInput register={register} nombre="escuela" />
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <div className="w-full">
                          <p className="text-lg font-medium ml-1">Tipo</p>
                          <select
                            className="w-full font-seravek text-base h-10 bg-headerbg text-textform rounded-xl px-2.5 mb-2"
                            {...register("tipo")}
                          >
                            <option value="choose" defaultChecked>
                              Selecciona un tipo
                            </option>
                            <option value="Directiva">Directiva</option>
                            <option value="Investigación">Investigación</option>
                            <option value="Profesionalizante">
                              Profesionalizante
                            </option>
                          </select>
                        </div>

                        <div className="w-full">
                          <p className="text-lg font-medium ml-1">Grado</p>
                          <select
                            className="w-full font-seravek text-base h-10 bg-headerbg text-textform rounded-xl px-2.5 mb-2"
                            {...register("grado")}
                          >
                            <option value="choose" defaultChecked>
                              Selecciona un grado
                            </option>
                            <option value="Diplomado">Diplomado</option>
                            <option value="Maestría">Maestría</option>
                            <option value="Doctorado">Doctorado</option>
                            <option value="Especialidad">Especialidad</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <div className="w-full">
                          <p className="text-lg font-medium ml-1">Modalidad</p>
                          <select
                            className="w-full font-seravek text-base h-10 bg-headerbg text-textform rounded-xl px-2.5 mb-2"
                            {...register("modalidad")}
                          >
                            <option value="choose" defaultChecked>
                              Selecciona la modalidad
                            </option>
                            <option value="En línea">En línea</option>
                            <option value="Presencial">Presencial</option>
                            <option value="Mixta">Mixta</option>
                          </select>
                        </div>
                        <div className="w-full">
                          <p className="text-lg font-medium ml-1">
                            Duración (meses)
                          </p>
                          <input
                            type="number"
                            className="w-full font-seravek text-base h-10 bg-headerbg text-textform rounded-xl px-2.5 mb-2"
                            {...register("duracion")}
                          />
                        </div>
                      </div>
                    </>
                  ) : null}
                  <button
                    type="submit"
                    className="w-full bg-primary text-center text-white h-10 rounded-xl mt-5"
                  >
                    COMENZAR PROCESO
                  </button>
                </form>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col font-seravek justify-start">
                <div className="flex items-center font-medium w-full">
                  <button
                    onClick={() => setTipo("choose")}
                    className="justify-self-start"
                  >
                    <svg
                      width="8"
                      height="14"
                      viewBox="0 0 8 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.53739 13.2501C7.7702 13.0159 7.90088 12.6991 7.90088 12.3689C7.90088 12.0386 7.7702 11.7218 7.53739 11.4876L3.11239 7.00012L7.53739 2.57512C7.7702 2.34092 7.90088 2.0241 7.90088 1.69387C7.90088 1.36364 7.7702 1.04682 7.53739 0.812619C7.42118 0.695458 7.28293 0.602465 7.13061 0.539004C6.97829 0.475544 6.8149 0.442871 6.64989 0.442871C6.48487 0.442871 6.32149 0.475544 6.16917 0.539004C6.01684 0.602465 5.87859 0.695458 5.76239 0.812619L0.462389 6.11262C0.345228 6.22882 0.252235 6.36707 0.188775 6.5194C0.125314 6.67172 0.0926406 6.8351 0.0926406 7.00012C0.0926406 7.16513 0.125314 7.32852 0.188775 7.48084C0.252235 7.63316 0.345228 7.77142 0.462389 7.88762L5.76239 13.2501C5.87859 13.3673 6.01684 13.4603 6.16917 13.5237C6.32149 13.5872 6.48487 13.6199 6.64989 13.6199C6.8149 13.6199 6.97829 13.5872 7.13061 13.5237C7.28293 13.4603 7.42118 13.3673 7.53739 13.2501Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                  <h1 className="text-xl ml-2 justify-self-center w-full text-center">
                    NUEVO PROGRAMA
                  </h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <p className="text-lg font-medium ml-4">
                    Nombre del programa
                  </p>
                  <NombrePrograma register={register} nombre="programa" />
                  <div className="flex space-x-4">
                    <div className="w-full">
                      <p className="text-lg font-medium ml-1">Código</p>
                      <input
                        placeholder="Escribe el codigo del programa"
                        className="w-full font-seravek text-base h-10 bg-headerbg text-textform rounded-xl px-2.5 mb-2"
                        {...register("codigo")}
                      />
                    </div>
                    <div className="w-full">
                      <p className="text-lg font-medium ml-1">Escuela</p>
                      <EscuelaInput register={register} nombre="escuela" />
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-full">
                      <p className="text-lg font-medium ml-1">Tipo</p>
                      <select
                        className="w-full font-seravek text-base h-10 bg-headerbg text-textform rounded-xl px-2.5 mb-2"
                        {...register("tipo")}
                      >
                        <option value="choose" defaultChecked>
                          Selecciona un tipo
                        </option>
                        <option value="Directiva">Directiva</option>
                        <option value="Investigación">Investigación</option>
                        <option value="Profesionalizante">
                          Profesionalizante
                        </option>
                      </select>
                    </div>

                    <div className="w-full">
                      <p className="text-lg font-medium ml-1">Grado</p>
                      <select
                        className="w-full font-seravek text-base h-10 bg-headerbg text-textform rounded-xl px-2.5 mb-2"
                        {...register("grado")}
                      >
                        <option value="choose" defaultChecked>
                          Selecciona un grado
                        </option>
                        <option value="Diplomado">Diplomado</option>
                        <option value="Maestría">Maestría</option>
                        <option value="Doctorado">Doctorado</option>
                        <option value="Especialidad">Especialidad</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="w-full">
                      <p className="text-lg font-medium ml-1">Modalidad</p>
                      <select
                        className="w-full font-seravek text-base h-10 bg-headerbg text-textform rounded-xl px-2.5 mb-2"
                        {...register("modalidad")}
                      >
                        <option value="choose" defaultChecked>
                          Selecciona la modalidad
                        </option>
                        <option value="En línea">En línea</option>
                        <option value="Presencial">Presencial</option>
                        <option value="Mixta">Mixta</option>
                      </select>
                    </div>
                    <div className="w-full">
                      <p className="text-lg font-medium ml-1">
                        Duración (meses)
                      </p>
                      <input
                        type="number"
                        className="w-full font-seravek text-base h-10 bg-headerbg text-textform rounded-xl px-2.5 mb-2"
                        {...register("duracion")}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-center text-white h-10 rounded-xl mt-5"
                  >
                    COMENZAR PROCESO
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
