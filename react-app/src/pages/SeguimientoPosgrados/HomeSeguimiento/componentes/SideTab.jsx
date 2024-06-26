import { useState, useEffect } from "react";
import axios from "axios";

export default function SideTab(props) {
  const onClose = () => {
    props.setProceso(null);
  };
  const [duracion, setDuracion] = useState();
  const [notas, setNotas] = useState();
  const [modalidad, setModalidad] = useState();
  const [campus, setCampus] = useState();
  const [rvoe, setRvoe] = useState();

  useEffect(() => {
    if (!props.proceso) {
      return;
    }
    const data = {};
    if (duracion && duracion !== props.proceso?.programa.duracion) {
      data.duracion = duracion;
    }
    if (modalidad && modalidad !== props.proceso?.programa.modalidad) {
      data.modalidad = modalidad;
    }
    if (campus && campus !== props.proceso?.programa.campus) {
      data.campus = campus;
    }
    if (rvoe && rvoe !== props.proceso?.programa.rvoe) {
      data.rvoe = rvoe;
    }
    if (notas && notas !== props.proceso?.notas) {
      data.notas = notas;
      data.id_proceso = props.proceso?.id;
    }

    if (Object.keys(data).length === 0) {
      return;
    }

    const getData = setTimeout(() => {
      axios
        .patch(
          import.meta.env.VITE_URL_API +
            "/programa_proceso/" +
            props.proceso?.programa.programa,
          data,
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.proceso) {
            props.setProcesos((prev) => {
              return prev.map((proceso) => {
                if (proceso?.programa.programa == res.data.programa.programa) {
                  res.data.programa.duracion
                    ? (proceso.programa = res.data.programa)
                    : null;
                  proceso.notas = res.data.proceso.notas;
                  return proceso;
                } else {
                  return proceso;
                }
              });
            });

            return;
          }
          props.setProcesos((prev) => {
            return prev.map((proceso) => {
              if (proceso?.programa.programa == res.data.programa.programa) {
                res.data.programa.duracion
                  ? (proceso.programa = res.data.programa)
                  : null;
                return proceso;
              } else {
                return proceso;
              }
            });
          });
        })
        .catch((err) => {
          console.log(err.response);
        });
    }, 2000);

    return () => clearTimeout(getData);
  }, [duracion, notas, modalidad, campus, rvoe]);

  useEffect(() => {
    if (!props.proceso) {
      return;
    }
    setDuracion(props.proceso?.programa.duracion);
    setNotas(props.proceso?.notas);
    setModalidad(props.proceso?.programa.modalidad);
    setCampus(props.proceso?.programa.campus);
    setRvoe(props.proceso?.programa.rvoe);
  }, [props.proceso]);

  const onActivityClick = (actividadProceso, driveId) => {
    actividadProceso.evidenciaId
      ? window.open(
          `https://drive.google.com/file/d/${actividadProceso.evidenciaId}/view?usp=sharing`
        )
      : actividadProceso.evidenciaUrl
      ? window.open(actividadProceso.evidenciaUrl)
      : window.open(`https://drive.google.com/drive/folders/${driveId}`);
  };

  if (!props.proceso) {
    return null;
  }

  return (
    <div className="transition-all w-1/2 h-[calc(100dvh)] fixed z-10 bg-white right-0 top-0 shadow-2xl p-10 font-seravek overflow-auto">
      <button className="absolute left-2 top-2" onClick={onClose}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.41 11.9999L19.71 5.70994C19.8983 5.52164 20.0041 5.26624 20.0041 4.99994C20.0041 4.73364 19.8983 4.47825 19.71 4.28994C19.5217 4.10164 19.2663 3.99585 19 3.99585C18.7337 3.99585 18.4783 4.10164 18.29 4.28994L12 10.5899L5.71 4.28994C5.5217 4.10164 5.2663 3.99585 5 3.99585C4.7337 3.99585 4.4783 4.10164 4.29 4.28994C4.1017 4.47825 3.99591 4.73364 3.99591 4.99994C3.99591 5.26624 4.1017 5.52164 4.29 5.70994L10.59 11.9999L4.29 18.2899C4.19627 18.3829 4.12188 18.4935 4.07111 18.6154C4.02034 18.7372 3.9942 18.8679 3.9942 18.9999C3.9942 19.132 4.02034 19.2627 4.07111 19.3845C4.12188 19.5064 4.19627 19.617 4.29 19.7099C4.38296 19.8037 4.49356 19.8781 4.61542 19.9288C4.73728 19.9796 4.86799 20.0057 5 20.0057C5.13201 20.0057 5.26272 19.9796 5.38458 19.9288C5.50644 19.8781 5.61704 19.8037 5.71 19.7099L12 13.4099L18.29 19.7099C18.383 19.8037 18.4936 19.8781 18.6154 19.9288C18.7373 19.9796 18.868 20.0057 19 20.0057C19.132 20.0057 19.2627 19.9796 19.3846 19.9288C19.5064 19.8781 19.617 19.8037 19.71 19.7099C19.8037 19.617 19.8781 19.5064 19.9289 19.3845C19.9797 19.2627 20.0058 19.132 20.0058 18.9999C20.0058 18.8679 19.9797 18.7372 19.9289 18.6154C19.8781 18.4935 19.8037 18.3829 19.71 18.2899L13.41 11.9999Z"
            fill="#BABABA"
          />
        </svg>
      </button>
      <p className="font-timesnr text-3xl text-primary mb-1">
        {props.proceso?.programa.programa}
      </p>
      <p className="font-timesnr text-xl text-secondary mb-5">
        {props.proceso?.programa.codigo}
      </p>
      <div className="space-y-5 mb-5">
        <span className="flex space-x-5 items-center">
          <span className="w-28 flex space-x-3 items-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8333 15H2.50001C2.03977 15 1.66667 14.6269 1.66667 14.1667V3.33333C1.66667 2.8731 2.03977 2.5 2.50001 2.5H17.5C17.9603 2.5 18.3333 2.8731 18.3333 3.33333V14.1667C18.3333 14.6269 17.9603 15 17.5 15H14.1667"
                stroke="#BABABA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 5.83325H15"
                stroke="#BABABA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 8.75H7.5"
                stroke="#BABABA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 11.6667H6.66667"
                stroke="#BABABA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.5 13.75C13.8807 13.75 15 12.6307 15 11.25C15 9.86929 13.8807 8.75 12.5 8.75C11.1193 8.75 10 9.86929 10 11.25C10 12.6307 11.1193 13.75 12.5 13.75Z"
                stroke="#BABABA"
              />
              <path
                d="M12.5 16.6668L14.1667 17.5001V13.1135C14.1667 13.1135 13.6914 13.7501 12.5 13.7501C11.3086 13.7501 10.8333 13.1251 10.8333 13.1251V17.5001L12.5 16.6668Z"
                stroke="#BABABA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-base text-[#BABABA]">RVOE</p>
          </span>
          <input
            type="text"
            className="text-base"
            defaultValue={props.proceso?.programa?.rvoe}
            placeholder="Escribe el RVOE"
            key={props.proceso?.id}
            onChange={(e) => setRvoe(e.target.value)}
          ></input>
        </span>
        {props.proceso?.programa?.programa_previo ? (
          <span className="flex space-x-5 items-center">
            <span className="w-28 flex space-x-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.16666 18.3334C3.70642 18.3334 3.33333 17.9603 3.33333 17.5001V2.50008C3.33333 2.03984 3.70642 1.66675 4.16666 1.66675H15.8333C16.2936 1.66675 16.6667 2.03984 16.6667 2.50008V17.5001C16.6667 17.9603 16.2936 18.3334 15.8333 18.3334H4.16666Z"
                  stroke="#BABABA"
                  strokeLinejoin="round"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.75 9.16675V1.66675H13.75V9.16675L11.25 6.55312L8.75 9.16675Z"
                  stroke="#BABABA"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.16667 1.66675H15.8333"
                  stroke="#BABABA"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-base text-[#BABABA]">Previo</p>
            </span>
            <p>{props.proceso?.programa?.programa_previo}</p>
          </span>
        ) : null}

        <span className="flex space-x-5 items-center">
          <span className="w-28 flex space-x-3 items-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.16666 18.3334C3.70642 18.3334 3.33333 17.9603 3.33333 17.5001V2.50008C3.33333 2.03984 3.70642 1.66675 4.16666 1.66675H15.8333C16.2936 1.66675 16.6667 2.03984 16.6667 2.50008V17.5001C16.6667 17.9603 16.2936 18.3334 15.8333 18.3334H4.16666Z"
                stroke="#BABABA"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.75 9.16675V1.66675H13.75V9.16675L11.25 6.55312L8.75 9.16675Z"
                stroke="#BABABA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.16667 1.66675H15.8333"
                stroke="#BABABA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-base text-[#BABABA]">Escuela</p>
          </span>
          <p className="text-base">{props.proceso?.programa.escuela}</p>
        </span>
        <span className="flex space-x-5 items-center">
          <span className="w-28 flex space-x-3 items-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 16.5C2 15.9477 2.44771 15.5 3 15.5H6V12L12 8L18 12V15.5H21C21.5523 15.5 22 15.9477 22 16.5V21C22 21.5523 21.5523 22 21 22H2V16.5Z"
                stroke="#BABABA"
                strokeLinejoin="round"
              />
              <path d="M12 3V8" stroke="#BABABA" strokeLinecap="round" />
              <path
                d="M18 5.9999V2.99992C18 2.99992 17.25 4.49992 15 2.99992C12.75 1.49992 12 2.99992 12 2.99992V5.9999C12 5.9999 12.75 4.49992 15 5.9999C17.25 7.4999 18 5.9999 18 5.9999Z"
                stroke="#BABABA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 22V15.5H10V22"
                stroke="#BABABA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 22H15"
                stroke="#BABABA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-base text-[#BABABA]">Campus</p>
          </span>
          <select
            className="text-base w-32"
            onChange={(e) => {
              setCampus(e.target.value);
            }}
            key={props.proceso.id}
            defaultValue={props.proceso?.programa?.campus}
          >
            <option value="Mixcoac">Mixcoac</option>
            <option value="Santa Fe">Santa Fe</option>
          </select>
        </span>
        <span className="flex space-x-5 items-center">
          <span className="w-28 flex space-x-3">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 8.7L11.5111 4.5L22.0222 8.7L11.5111 12.9L1 8.7Z"
                stroke="#BABABA"
                strokeLinejoin="round"
              />
              <path
                d="M22.0222 8.75488V13.3665"
                stroke="#BABABA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.77785 10.9126V17.1333C5.77785 17.1333 8.1829 19.4999 11.5112 19.4999C14.8395 19.4999 17.2445 17.1333 17.2445 17.1333V10.9126"
                stroke="#BABABA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-base text-[#BABABA]">Grado</p>
          </span>
          <p className="text-base">{props.proceso?.programa?.grado}</p>
        </span>
        <span className="flex space-x-5 items-center">
          <span className="w-28 flex space-x-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.0833 3.33325H2.91666C2.45642 3.33325 2.08333 3.70635 2.08333 4.16659V12.4999C2.08333 12.9602 2.45642 13.3333 2.91666 13.3333H17.0833C17.5436 13.3333 17.9167 12.9602 17.9167 12.4999V4.16659C17.9167 3.70635 17.5436 3.33325 17.0833 3.33325Z"
                stroke="#BABABA"
              />
              <path
                d="M1.66667 16.6667H18.3333"
                stroke="#BABABA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.16667 5.83325H10.8333"
                stroke="#BABABA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-base text-[#BABABA]">Modalidad</p>
          </span>
          <select
            className="text-base w-32"
            defaultValue={props.proceso.programa?.modalidad}
            key={props.proceso.id}
            onChange={(e) => setModalidad(e.target.value)}
          >
            <option value="Presencial">Presencial</option>
            <option value="En línea">En línea</option>
            <option value="Mixta">Mixta</option>
          </select>
        </span>
        <span className="flex space-x-5 items-center">
          <span className="w-28 flex space-x-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 18.3334C14.6024 18.3334 18.3333 14.6025 18.3333 10.0001C18.3333 5.39771 14.6024 1.66675 10 1.66675C5.39763 1.66675 1.66667 5.39771 1.66667 10.0001C1.66667 14.6025 5.39763 18.3334 10 18.3334Z"
                stroke="#BABABA"
                strokeLinejoin="round"
              />
              <path
                d="M10.0035 5L10.003 10.0037L13.5361 13.5368"
                stroke="#BABABA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-base text-[#BABABA]">Duración</p>
          </span>
          <span className="text-base">
            {" "}
            <input
              type="number"
              className="w-8"
              defaultValue={props.proceso?.programa?.duracion}
              onChange={(e) => setDuracion(e.target.value)}
              key={props.proceso?.id}
            ></input>{" "}
            meses
          </span>
        </span>
        <span className="flex space-x-5 items-center">
          <span className="w-28 flex space-x-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 18.3334C14.6024 18.3334 18.3333 14.6025 18.3333 10.0001C18.3333 5.39771 14.6024 1.66675 10 1.66675C5.39763 1.66675 1.66667 5.39771 1.66667 10.0001C1.66667 14.6025 5.39763 18.3334 10 18.3334Z"
                stroke="#BABABA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 5V6.25"
                stroke="#BABABA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.5355 6.46436L12.6516 7.34823"
                stroke="#BABABA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 10H13.75"
                stroke="#BABABA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.5355 13.5355L12.6516 12.6516"
                stroke="#BABABA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 15V13.75"
                stroke="#BABABA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.46449 13.5355L7.34837 12.6516"
                stroke="#BABABA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 10H6.25"
                stroke="#BABABA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.46449 6.46436L7.34837 7.34823"
                stroke="#BABABA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-base text-[#BABABA]">Estado</p>
          </span>
          <p className="text-base">{Math.trunc(props.proceso?.porcentaje)}%</p>
        </span>
        <span className="flex space-x-5 items-center">
          <span className="w-28 flex space-x-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.33333 2.50008C3.33333 2.03984 3.70642 1.66675 4.16666 1.66675H12.5L16.6667 5.83341V17.5001C16.6667 17.9603 16.2936 18.3334 15.8333 18.3334H4.16666C3.70642 18.3334 3.33333 17.9603 3.33333 17.5001V2.50008Z"
                stroke="#BABABA"
                strokeLinejoin="round"
              />
              <path
                d="M6.66667 8.33325H13.3333"
                stroke="#BABABA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.66667 11.6667H13.3333"
                stroke="#BABABA"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-base text-[#BABABA]">Notas</p>
          </span>
          <textarea
            className="text-base"
            defaultValue={props.proceso?.notas}
            placeholder="Escribe aquí tus notas"
            onChange={(e) => setNotas(e.target.value)}
            key={props.proceso?.id}
          />
        </span>
      </div>
      {props.proceso?.etapaProcesos?.map((etapa) => {
        return (
          <div key={etapa.id}>
            <p className="text-primary font-bold text-xl mt-5">
              ETAPA {etapa.etapa.numero}
            </p>
            {etapa.actividadProcesos?.map((actividad) => {
              return (
                <span className="flex space-x-3" key={actividad.id}>
                  {actividad.estado == "Completada" ? (
                    <span className="flex space-x-5 mb-3">
                      <p
                        className="text-secondary underline cursor-pointer w-96 leading-tight"
                        onClick={() =>
                          onActivityClick(actividad, props.proceso.driveId)
                        }
                      >
                        {actividad.actividad.evidencia}
                      </p>
                      <p>
                        {new Date(actividad.updatedAt).toLocaleDateString(
                          "es-MX",
                          {}
                        )}
                      </p>
                    </span>
                  ) : null}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
