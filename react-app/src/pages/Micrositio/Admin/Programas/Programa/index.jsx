import Main from "../../../components/Main";
import Header from "../../../components/Header";
import Form from "../../../components/Form";
import { useParams } from "react-router-dom";
import { usePrograma } from "../../../../../hooks/useProgramas";
import { usePersonas } from "../../../../../hooks/usePersonas";
import { usePeriodos } from "../../../../../hooks/usePeriodos";
import Table from "../../../components/Table";
import Error from "../../../components/Error";
import { useForm } from "react-hook-form";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Select from "react-select";
import Creatable from "react-select/creatable";
import personas_to_options_format from "../../../../../utils/personas_to_options_format";

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
  const { personas } = usePersonas();
  const { loading, programaData, error } = usePrograma(programa);
  const { periodos, update: update_programa } = usePeriodos();

  const periodos_options = periodos.map((periodo) => {
    return { value: periodo.id, label: periodo.periodo_nombre };
  });

  const periodos_programa_options = programaData.periodo_programas?.map(
    (periodo) => {
      return {
        value: periodo.id,
        label: periodo.periodo.periodo_nombre,
      };
    }
  );

  const personas_options = personas_to_options_format(personas);

  const [nuevosPuestosPrograma, setNuevosPuestosPrograma] = useState([]);
  const [nuevasAperturas, setNuevasAperturas] = useState([]);
  const [nuevosCostos, setNuevosCostos] = useState([]);
  const [nuevosPeriodosProgramas, setNuevosPeriodosProgramas] = useState([]);
  const [aperturasChanges, setAperturasChanges] = useState([]);

  const [programChanged, setProgramChanged] = useState(false);

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

  const addCosto = () => {
    setNuevosCostos([
      ...nuevosCostos,
      {
        year: "",
        num_mensualidades: 0,
        monto_mensual: 0,
        costo_inscripcion: 0,
        programaPrograma: programa,
      },
    ]);
  };

  const updateCosto = (index, key, value) => {
    setNuevosCostos(
      nuevosCostos.map((costo, i) => {
        if (i === index) {
          return { ...costo, [key]: value };
        }
        return costo;
      })
    );
  };

  const saveCostos = async () => {
    await axios
      .post(
        `${import.meta.env.VITE_URL_API}/programa/costo`,
        {
          nuevosCostos,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const addApertura = () => {
    setNuevasAperturas([
      ...nuevasAperturas,
      {
        fecha_inicio: "",
        fecha_fin: "",
        term: "",
        programaPrograma: programa,
      },
    ]);
  };

  const updateApertura = (index, key, value) => {
    setNuevasAperturas(
      nuevasAperturas.map((apertura, i) => {
        if (i === index) {
          return { ...apertura, [key]: value };
        }
        return apertura;
      })
    );
  };

  const saveAperturas = async () => {
    await axios

      .post(
        `${import.meta.env.VITE_URL_API}/programa/apertura`,
        {
          nuevasAperturas,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const addPuestoPrograma = () => {
    setNuevosPuestosPrograma([
      ...nuevosPuestosPrograma,
      {
        puesto: "",
        programaPrograma: programa,
        usuarioId: "",
      },
    ]);
  };

  const updatePuestoPrograma = (index, key, value) => {
    setNuevosPuestosPrograma(
      nuevosPuestosPrograma.map((puesto, i) => {
        if (i === index) {
          return { ...puesto, [key]: value };
        }
        return puesto;
      })
    );
  };

  const savePuestosPrograma = async () => {
    await axios
      .post(
        `${import.meta.env.VITE_URL_API}/programa/puesto`,
        {
          nuevosPuestosPrograma,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const addPeriodoPrograma = () => {
    setNuevosPeriodosProgramas([
      ...nuevosPeriodosProgramas,
      {
        meta_inscripciones: 0,
        num_inscripciones: 0,
        periodoId: null,
        programaPrograma: programa,
      },
    ]);
  };

  const updatePeriodoPrograma = (index, key, value) => {
    setNuevosPeriodosProgramas(
      nuevosPeriodosProgramas.map((periodo, i) => {
        if (i === index) {
          return { ...periodo, [key]: value };
        }
        return periodo;
      })
    );
  };

  const savePeriodosProgramas = async () => {
    await axios
      .post(
        `${import.meta.env.VITE_URL_API}/programa/periodo`,
        {
          nuevosPeriodosProgramas,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const createPeriodo = async (periodo) => {
    await axios
      .post(
        `${import.meta.env.VITE_URL_API}/periodo`,
        {
          periodo_nombre: periodo,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        update_programa();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const changeApertura = (index, key, value) => {
    console.log(value);
    setAperturasChanges([
      ...aperturasChanges,
      {
        id: index,
        field: key,
        value: value,
      },
    ]);
  };

  const saveAperturasChanges = async () => {
    await axios
      .patch(`${import.meta.env.VITE_URL_API}/aperturas`, aperturasChanges, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
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
            {(programChanged ||
              nuevosPuestosPrograma.length > 0 ||
              nuevosCostos.length > 0 ||
              nuevasAperturas.length > 0 ||
              nuevosPeriodosProgramas.length > 0 ||
              aperturasChanges.length > 0) && (
              <button
                onClick={() => {
                  if (programChanged) {
                    refSubmit.current.click();
                  }
                  if (nuevosPuestosPrograma.length > 0) {
                    savePuestosPrograma();
                  }
                  if (nuevasAperturas.length > 0) {
                    saveAperturas();
                  }
                  if (nuevosCostos.length > 0) {
                    saveCostos();
                  }
                  if (nuevosPeriodosProgramas.length > 0) {
                    savePeriodosProgramas();
                  }
                  if (aperturasChanges.length > 0) {
                    saveAperturasChanges();
                  }
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
            )}
          </Header>
          <Main>
            <Form
              title={programa}
              register={register("programa")}
              onSubmit={handleSubmit(onSubmit)}
            >
              <label for="codigo" className="font-bold">
                Código
              </label>
              <input
                autoComplete="off"
                {...register("codigo")}
                id="codigo"
                defaultValue={programaData.codigo}
                className="hover:border-gray-200 border-white/0 border-b focus:border-emerald-700"
                onChange={() => {
                  setProgramChanged(true);
                }}
              ></input>
              <label for="escuela" className="font-bold">
                E/F
              </label>
              <select
                id="escuela"
                className="hover:border-gray-200 border-white/0 border-b focus:border-emerald-700"
                {...register("escuela")}
                defaultValue={programaData.escuela}
                onChange={() => {
                  setProgramChanged(true);
                }}
              >
                <option value="Empresariales">Empresariales</option>
                <option value="ESDAI">ESDAI</option>
                <option value="Gobierno y Economía">Gobierno y Economía</option>
                <option value="Derecho">Derecho</option>
                <option value="Comunicación">Comunicación</option>
                <option value="Pedagogía">Pedagogía</option>
                <option value="Ingeniería">Ingeniería</option>
                <option value="Ciencias de la Salud">
                  Ciencias de la salud
                </option>
                <option value="Bellas Artes">Bellas Artes</option>
                <option value="Filosofía">Filosofía</option>
                <option value="Empresariales Santa Fe">
                  Empresariales Santa Fe
                </option>
                <option value="Educación Continua">Educación Continua</option>
              </select>
              <label for="grado" className="font-bold">
                Grado
              </label>
              <select
                id="grado"
                {...register("grado")}
                defaultValue={programaData.grado}
                className="hover:border-gray-200 border-white/0 border-b focus:border-emerald-700"
                onChange={() => {
                  setProgramChanged(true);
                }}
              >
                <option value="Maestría">Maestría</option>
                <option value="Especialidad">Especialidad</option>
                <option value="Doctorado">Doctorado</option>
              </select>
              <label for="tipo" className="font-bold">
                Tipo
              </label>
              <select
                id="tipo"
                {...register("tipo")}
                defaultValue={programaData.tipo}
                className="hover:border-gray-200 border-white/0 border-b focus:border-emerald-700"
                onChange={() => {
                  setProgramChanged(true);
                }}
              >
                <option value="Investigación">Investigación</option>
                <option value="Profesionalizante">Profesionalizante</option>
                <option value="Directiva">Directiva</option>
              </select>
              <label for="duracion" className="font-bold">
                Duración
              </label>
              <input
                id="duracion"
                autoComplete="off"
                className="hover:border-gray-200 border-white/0 border-b focus:border-emerald-700"
                {...register("duracion")}
                defaultValue={programaData.duracion}
                type="number"
                onChange={() => {
                  setProgramChanged(true);
                }}
              ></input>
              <label for="creditos" className="font-bold">
                Créditos
              </label>
              <input
                id="creditos"
                autoComplete="off"
                className="hover:border-gray-200 border-white/0 border-b focus:border-emerald-700"
                type="number"
                {...register("creditos")}
                defaultValue={programaData.creditos}
                onChange={() => {
                  setProgramChanged(true);
                }}
              ></input>
              <label for="year_inicio" className="font-bold">
                Año inicio
              </label>
              <input
                id="year_inicio"
                autoComplete="off"
                className="hover:border-gray-200 border-white/0 border-b focus:border-emerald-700"
                {...register("year_inicio")}
                defaultValue={programaData.year_inicio}
                onChange={() => {
                  setProgramChanged(true);
                }}
              ></input>
              <label for="num_materias" className="font-bold">
                # Materias
              </label>
              <input
                id="num_materias"
                autoComplete="off"
                type="number"
                className="hover:border-gray-200 border-white/0 border-b focus:border-emerald-700"
                {...register("num_materias")}
                defaultValue={programaData.num_materias}
                onChange={() => {
                  setProgramChanged(true);
                }}
              ></input>
              <label for="num_materias_ingles" className="font-bold">
                # Materias en inglés
              </label>
              <input
                id="num_materias_ingles"
                autoComplete="off"
                type="number"
                className="hover:border-gray-200 border-white/0 border-b focus:border-emerald-700"
                {...register("num_materias_ingles")}
                defaultValue={programaData.num_materias_ingles}
                onChange={() => {
                  setProgramChanged(true);
                }}
              ></input>
              <label for="rvoe" className="font-bold">
                RVOE
              </label>
              <input
                autoComplete="off"
                className="hover:border-gray-200 border-white/0 border-b focus:border-emerald-700"
                id="rvoe"
                {...register("rvoe")}
                defaultValue={programaData.rvoe}
                onChange={() => {
                  setProgramChanged(true);
                }}
              ></input>
              <label for="fecha_rvoe" className="font-bold">
                Fecha RVOE
              </label>
              <input
                id="fecha_rvoe"
                autoComplete="off"
                className="hover:border-gray-200 border-white/0 border-b focus:border-emerald-700"
                type="date"
                {...register("fecha_rvoe")}
                defaultValue={programaData.fecha_rvoe}
                onChange={() => {
                  setProgramChanged(true);
                }}
              ></input>
              <label for="modalidad" className="font-bold">
                Modalidad
              </label>
              <select
                id="modalidad"
                className="hover:border-gray-200 border-white/0 border-b focus:border-emerald-700"
                {...register("modalidad")}
                defaultValue={programaData.modalidad}
                onChange={() => {
                  setProgramChanged(true);
                }}
              >
                <option value="Presencial">Presencial</option>
                <option value="En línea">En línea</option>
                <option value="Mixta">Mixta</option>
              </select>
              <label for="campus" className="font-bold">
                Campus
              </label>
              <select
                id="campus"
                className="hover:border-gray-200 border-white/0 border-b focus:border-emerald-700"
                {...register("campus")}
                defaultValue={programaData.campus}
                onChange={() => {
                  setProgramChanged(true);
                }}
              >
                <option value="Mixcoac">Mixcoac</option>
                <option value="Santa Fe">Santa Fe</option>
                <option value="Guadalajara">Guadalajara</option>
                <option value="Aguascalientes">Aguascalientes</option>
              </select>
              <label for="esta_activo" className="font-bold">
                Está activo
              </label>
              <input
                id="esta_activo"
                type="checkbox"
                className="justify-self-start"
                {...register("esta_activo")}
                defaultValue={programaData.esta_activo}
                onChange={() => {
                  setProgramChanged(true);
                }}
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
                    <td className="px-2 py-1">
                      {costo.monto_mensual.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                    <td className="px-2 py-1">
                      {programaData.creditos
                        ? (
                            (costo.num_mensualidades * costo.monto_mensual) /
                            programaData.creditos
                          ).toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })
                        : "NA"}
                    </td>
                    <td className="px-2 py-1">
                      {costo.costo_inscripcion.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                    <td className="px-2 py-1">
                      {(
                        costo.num_mensualidades * costo.monto_mensual
                      ).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                    <td className="px-2 py-1">
                      {(
                        costo.num_mensualidades * costo.monto_mensual +
                        costo.costo_inscripcion
                      ).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                  </tr>
                );
              })}

              {nuevosCostos.map((costo, index) => {
                return (
                  <tr
                    className="border-b border-grayborder hover:bg-grayborder"
                    key={index}
                  >
                    <td className="px-2 py-1">
                      <input
                        onChange={(event) => {
                          updateCosto(index, "year", event.target.value);
                        }}
                        className="border-b border-transparent hover:border-white"
                      ></input>
                    </td>
                    <td className="px-2 py-1">
                      <input
                        type="number"
                        onChange={(event) => {
                          updateCosto(
                            index,
                            "num_mensualidades",
                            event.target.value
                          );
                        }}
                        className="border-b border-transparent hover:border-white"
                      ></input>
                    </td>
                    <td className="px-2 py-1">
                      <input
                        type="number"
                        onChange={(event) => {
                          updateCosto(
                            index,
                            "monto_mensual",
                            event.target.value
                          );
                        }}
                        className="border-b border-transparent hover:border-white"
                      ></input>
                    </td>
                    <td className="px-2 py-1">
                      {programaData.creditos
                        ? (
                            (costo.num_mensualidades * costo.monto_mensual) /
                            programaData.creditos
                          ).toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })
                        : "NA"}
                    </td>
                    <td className="px-2 py-1">
                      <input
                        type="number"
                        onChange={(event) => {
                          updateCosto(
                            index,
                            "costo_inscripcion",
                            event.target.value
                          );
                        }}
                        className="border-b border-transparent hover:border-white"
                      ></input>
                    </td>
                    <td>
                      {(
                        costo.num_mensualidades * costo.monto_mensual
                      ).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                    <td>
                      {(
                        costo.num_mensualidades * costo.monto_mensual +
                        parseInt(costo.costo_inscripcion)
                      ).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                  </tr>
                );
              })}

              <tr>
                <td className="p-2">
                  <button onClick={addCosto} className="flex text-emerald-700">
                    + Nuevo
                  </button>
                </td>
              </tr>
            </Table>

            <h2 className="text-xl font-bold my-5 ml-1">Aperturas y cierres</h2>
            <Table
              headers={[
                "Fecha inicio",
                "Fecha fin",
                "Term",
                "Meta",
                "Inscripciones",
                "Periodo",
              ]}
              loading={loading}
            >
              {programaData.periodo_programas?.map((periodo, index) => {
                return periodo?.aperturas_cierres?.map((apertura, index) => {
                  console.log(apertura);
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
                      <td className="px-2 py-1">
                        <input
                          type="number"
                          placeholder={
                            !apertura?.meta_inscripciones ||
                            apertura?.meta_inscripciones == 0
                              ? periodo?.meta_inscripciones /
                                periodo?.aperturas_cierres?.length
                              : null
                          }
                          defaultValue={
                            apertura?.meta_inscripciones &&
                            apertura?.meta_inscripciones !== 0
                              ? apertura?.meta_inscripciones
                              : null
                          }
                          onChange={(event) => {
                            changeApertura(
                              apertura.id,
                              "meta_inscripciones",
                              event.target.value
                            );
                          }}
                        ></input>
                      </td>
                      <td className="px-2 py-1">
                        <input
                          type="number"
                          placeholder={
                            !apertura?.num_inscripciones ||
                            apertura?.num_inscripciones == 0
                              ? periodo?.num_inscripciones /
                                periodo?.aperturas_cierres?.length
                              : null
                          }
                          defaultValue={
                            apertura?.num_inscripciones &&
                            apertura?.num_inscripciones !== 0
                              ? apertura?.num_inscripciones
                              : null
                          }
                          onChange={(event) => {
                            changeApertura(
                              apertura.id,
                              "num_inscripciones",
                              event.target.value
                            );
                          }}
                        ></input>
                      </td>
                      <td className="px-2 py-1">
                        <Select
                          className="max-w-xs"
                          styles={{
                            control: (baseStyles) => ({
                              ...baseStyles,
                              border: "none",
                              fontFamily: "Seravek",
                              outline: "none",
                              backgroundColor: "transparent",
                            }),
                          }}
                          defaultValue={{
                            value: apertura.periodoProgramaId,
                            label: periodos_programa_options.find(
                              (periodo) =>
                                periodo.value === apertura.periodoProgramaId
                            )?.label,
                          }}
                          onChange={(option) => {
                            changeApertura(
                              apertura.id,
                              "periodoProgramaId",
                              option.value
                            );
                          }}
                          options={periodos_programa_options}
                        ></Select>
                      </td>
                    </tr>
                  );
                });
              })}

              {nuevasAperturas.map((apertura, index) => {
                return (
                  <tr
                    className="border-b border-grayborder hover:bg-grayborder"
                    key={index}
                  >
                    <td className="px-2 py-1">
                      <input
                        type="date"
                        onChange={(event) => {
                          updateApertura(
                            index,
                            "fecha_inicio",
                            event.target.value
                          );
                        }}
                        className="border-b border-transparent hover:border-white"
                      ></input>
                    </td>
                    <td className="px-2 py-1">
                      <input
                        type="date"
                        onChange={(event) => {
                          updateApertura(
                            index,
                            "fecha_fin",
                            event.target.value
                          );
                        }}
                        className="border-b border-transparent hover:border-white"
                      ></input>
                    </td>
                    <td className="px-2 py-1">
                      <input
                        type="text"
                        onChange={(event) => {
                          updateApertura(index, "term", event.target.value);
                        }}
                        className="border-b-2 border-transparent hover:border-white"
                      ></input>
                    </td>
                    <td>
                      <Select
                        className="max-w-xs"
                        styles={{
                          control: (baseStyles) => ({
                            ...baseStyles,
                            border: "none",
                            fontFamily: "Seravek",
                            outline: "none",
                            backgroundColor: "transparent",
                          }),
                        }}
                        options={periodos_programa_options}
                        onChange={(option) => {
                          updateApertura(
                            index,
                            "periodoProgramaId",
                            option.value
                          );
                        }}
                      ></Select>
                    </td>
                  </tr>
                );
              })}

              <tr>
                <td className="p-2">
                  <button
                    onClick={addApertura}
                    className="flex text-emerald-700"
                  >
                    + Nuevo
                  </button>
                </td>
              </tr>
            </Table>

            <h2 className="text-xl font-bold my-5 ml-1">Periodos</h2>
            <Table
              headers={["Periodo", "Meta Alumnos", "Inscritos", "Porcentaje"]}
              loading={loading}
            >
              {programaData.periodo_programas?.map((meta, index) => {
                return (
                  <tr
                    className="border-b border-grayborder hover:bg-grayborder transition-all ease-in-out duration-300"
                    key={index}
                  >
                    <td className="px-2 py-1">
                      {meta?.periodo.periodo_nombre}
                    </td>
                    <td className="px-2 py-1">{meta.meta_inscripciones}</td>
                    <td className="px-2 py-1">{meta.num_inscripciones}</td>
                    <td className="px-2 py-1">
                      {(meta.num_inscripciones / meta.meta_inscripciones) * 100}
                      %
                    </td>
                  </tr>
                );
              })}

              {nuevosPeriodosProgramas?.map((meta, index) => {
                return (
                  <tr
                    className="border-b border-grayborder hover:bg-grayborder transition-all ease-in-out duration-300"
                    key={index}
                  >
                    <td>
                      <Creatable
                        className="max-w-xs"
                        styles={{
                          control: (baseStyles) => ({
                            ...baseStyles,
                            border: "none",
                            fontFamily: "Seravek",
                            outline: "none",
                            backgroundColor: "transparent",
                          }),
                        }}
                        options={periodos_options}
                        onChange={(option) => {
                          updatePeriodoPrograma(
                            index,
                            "periodoId",
                            option.value
                          );
                        }}
                        onCreateOption={(periodo) => createPeriodo(periodo)}
                      ></Creatable>
                    </td>
                    <td>
                      <input
                        type="number"
                        onChange={(event) => {
                          updatePeriodoPrograma(
                            index,
                            "meta_inscripciones",
                            event.target.value
                          );
                        }}
                        className="w-full border-b border-transparent hover:border-white"
                      ></input>
                    </td>
                    <td>
                      <input
                        type="number"
                        onChange={(event) => {
                          updatePeriodoPrograma(
                            index,
                            "num_inscripciones",
                            event.target.value
                          );
                        }}
                        className="w-full border-b border-transparent hover:border-white"
                      ></input>
                    </td>
                    <td>
                      {(meta.num_inscripciones / meta.meta_inscripciones) * 100}
                      %
                    </td>
                  </tr>
                );
              })}

              <tr>
                <td className="p-2">
                  <button
                    onClick={addPeriodoPrograma}
                    className="flex text-emerald-700"
                  >
                    + Nuevo
                  </button>
                </td>
              </tr>
            </Table>

            <h2 className="text-xl font-bold my-5 ml-1">Puestos</h2>
            <Table headers={["Persona", "Puesto"]} loading={loading}>
              {programaData.puesto_programas?.map((puesto, index) => {
                return (
                  <tr
                    className="border-b border-grayborder hover:bg-grayborder transition-all ease-in-out duration-300"
                    key={index}
                  >
                    <td className="px-2 py-1 underline text-emerald-800 flex items-center space-x-2">
                      <img
                        height={20}
                        width={20}
                        className="rounded-full"
                        src={puesto.usuario?.foto}
                      ></img>
                      <Link
                        to={`/micrositio/admin/personas/${puesto.usuarioId}`}
                      >
                        {puesto.usuario.nombre}
                      </Link>
                    </td>
                    <td className="px-2 py-1">{puesto.puesto}</td>
                  </tr>
                );
              })}

              {nuevosPuestosPrograma.map((puesto, index) => {
                return (
                  <tr
                    className="border-b border-grayborder hover:bg-grayborder"
                    key={index}
                  >
                    <td className="px-2 py-1 text-emerald-800 flex items-center space-x-2">
                      <Select
                        className="w-full"
                        options={personas_options}
                        styles={{
                          control: (baseStyles) => ({
                            ...baseStyles,
                            border: "none",
                            fontFamily: "Seravek",
                            outline: "none",
                            backgroundColor: "transparent",
                          }),
                        }}
                        onChange={(option) => {
                          updatePuestoPrograma(
                            index,
                            "usuarioId",
                            option.value
                          );
                        }}
                      />
                    </td>
                    <td className="px-2 py-1">
                      <select
                        onChange={(event) => {
                          updatePuestoPrograma(
                            index,
                            "puesto",
                            event.target.value
                          );
                        }}
                        defaultValue=""
                        className="w-full"
                      >
                        <option value="" disabled>
                          Selecciona un puesto
                        </option>
                        <option value="Subdirector">Subdirector</option>
                        <option value="Director">Director</option>
                        <option value="Coordinador de Promoción y Admisiones">
                          Coordinador de Promoción y Admisiones
                        </option>
                        <option value="Coordinador Académico">
                          Coordinador Académico
                        </option>
                        <option value="Jefe Académico">Jefe Académico</option>
                        <option value="Asistente">Asistente</option>
                        <option value="Program Manager">Program Manager</option>
                        <option value="Coordinador de Admisiones">
                          Coordinador de Admisiones
                        </option>
                      </select>
                    </td>
                  </tr>
                );
              })}

              <tr>
                <td className="p-2">
                  <button
                    onClick={addPuestoPrograma}
                    className="flex text-emerald-700"
                  >
                    + Nuevo
                  </button>
                </td>
              </tr>
            </Table>
          </Main>
        </>
      )}
      <ToastContainer />
    </div>
  );
}
