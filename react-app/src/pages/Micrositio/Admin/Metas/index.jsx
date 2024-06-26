import Header from "../../components/Header";
import Main from "../../components/Main";
import Table from "../../components/Table";
import { usePeriodoPrograma } from "../../../../hooks/usePeriodoPrograma";
import { useState } from "react";
import Creatable from "react-select/creatable";
import Select from "react-select";
import { usePeriodos } from "../../../../hooks/usePeriodos";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useProgramasOpciones } from "../../../../hooks/useProgramas";

const headers = [
  "Periodo",
  "Programa",
  "Meta Alumnos",
  "Inscritos",
  "Porcentaje",
];

export default function Metas() {
  const { loading, metas, update } = usePeriodoPrograma("Todos");
  const [newMetas, setNewMetas] = useState([]);
  const { periodos, update: update_periodos } = usePeriodos();
  const { programas } = useProgramasOpciones("Todos");

  const periodos_options = periodos.map((periodo) => {
    return { value: periodo.id, label: periodo.periodo_nombre };
  });

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
        update_periodos();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const addNewMetas = () => {
    setNewMetas([
      ...newMetas,
      {
        periodoId: "",
        programaPrograma: "",
        meta_inscripciones: 0,
        num_inscripciones: 0,
      },
    ]);
  };

  const updateNewMetas = (index, key, value) => {
    const newMetasCopy = [...newMetas];
    newMetasCopy[index][key] = value;
    setNewMetas(newMetasCopy);
  };

  const saveNewMetas = async () => {
    await axios
      .post(
        `${import.meta.env.VITE_URL_API}/programa/periodo`,
        {
          nuevosPeriodosProgramas: newMetas,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        update();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="w-full flex flex-col relative h-screen">
      <Header title="Metas">
        {newMetas?.length > 0 && (
          <button
            onClick={() => {
              saveNewMetas();
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
        <Table headers={headers} loading={loading}>
          <tr>
            <td className="p-2">
              <button
                onClick={() => addNewMetas()}
                className="flex text-emerald-700"
              >
                + Nuevo
              </button>
            </td>
          </tr>
          {newMetas.map((meta, index) => (
            <tr
              key={index}
              className="border-b border-grayborder hover:bg-grayborder transition-all ease-in-out duration-300"
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
                    updateNewMetas(index, "periodoId", option.value);
                  }}
                  onCreateOption={(periodo) => createPeriodo(periodo)}
                ></Creatable>
              </td>
              <td className="pl-10">
                <select
                  onChange={(event) => {
                    updateNewMetas(
                      index,
                      "programaPrograma",
                      event.target.value
                    );
                  }}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecciona un programa
                  </option>
                  {programas.map((programa, index) => {
                    return (
                      <option key={index} value={programa.programa}>
                        {programa.programa}
                      </option>
                    );
                  })}
                </select>
              </td>
              <td>
                <input
                  type="number"
                  value={meta.meta_inscripciones}
                  className="hover:border-gray-300 border-white/0 border-b focus:border-emerald-700"
                  onChange={(e) =>
                    updateNewMetas(index, "meta_inscripciones", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={meta.num_inscripciones}
                  className="hover:border-gray-300 border-white/0 border-b focus:border-emerald-700"
                  onChange={(e) =>
                    updateNewMetas(index, "num_inscripciones", e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
          {metas.map((meta, index) => (
            <tr
              className="border-b border-grayborder hover:bg-grayborder cursor-pointer transition-all ease-in-out duration-300"
              key={index}
            >
              <td className="px-2 py-1">{meta?.periodo?.periodo_nombre}</td>
              <td className="px-2 py-1">{meta?.programaPrograma}</td>
              <td className="px-2 py-1">{meta?.meta_inscripciones}</td>
              <td className="px-2 py-1">{meta?.num_inscripciones}</td>
              <td className="px-2 py-1 font-bold">
                {meta.num_inscripciones &&
                  meta.meta_inscripciones &&
                  (
                    (meta?.num_inscripciones / meta?.meta_inscripciones) *
                    100
                  )?.toFixed(2)}
                %
              </td>
            </tr>
          ))}
        </Table>
      </Main>
      <ToastContainer />
    </div>
  );
}
