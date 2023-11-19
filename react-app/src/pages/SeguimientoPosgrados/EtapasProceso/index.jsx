import { useEffect } from "react";
import { useEtapasproceso } from "../../../hooks/useEtapasProcesos";
import Header from "../componentes/Header";
import Upload from "./Upload";
import { setEvidenciaId } from "./Upload";
import { useSearchParams } from "react-router-dom";

export default function EtapasProceso() {
  const [tipo, setTipo] = useSearchParams();
  const etapas = useEtapasproceso(tipo.get("tipo"));

  const onCheck = (evidenciaId) => {
    console.log(evidenciaId);
    setEvidenciaId(evidenciaId);
  };

  return (
    <div>
      <Upload />
      <Header titulo="Nuevos programas y actualizaciones"></Header>
      <div className="overflow-x-scroll">
        <table className="font-seravek mt-5 border-collapse max-w-none">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              {etapas.length > 0
                ? etapas[0].procesos.map((proceso) => {
                    return (
                      <td
                        key={proceso.id}
                        className="font-timesnr pb-5 leading-tight px-2 text-center text-primary w-60"
                      >
                        <a
                          href={`https://drive.google.com/drive/folders/${proceso.driveId}`}
                          target="blank"
                        >
                          {proceso.programaPrograma}
                        </a>
                      </td>
                    );
                  })
                : null}
            </tr>
          </thead>

          <tbody>
            {etapas?.map((etapa) => {
              return (
                <>
                  <tr className="bg-primary text-white text-sm">
                    <td
                      colSpan={2}
                      className="font-timesnr text-left py-4 pl-5 font-bold w-60"
                    >{`ETAPA ${
                      etapa.numero
                    }. ${etapa.descripcion?.toUpperCase()}`}</td>
                    <td></td>
                    {etapa.procesos.map((proceso) => {
                      return (
                        <td className="text-center font-bold text-lg">
                          {Math.trunc(proceso.etapaProceso.porcentaje)}%
                        </td>
                      );
                    })}
                  </tr>
                  {etapa.actividads?.map((actividad) => {
                    return (
                      <>
                        <tr className="border-b border-secondary ">
                          <td className="px-2 py-1 text-center">
                            {actividad.numero}
                          </td>
                          <td className="px-3 py-2 border-x border-secondary  leading-tight">
                            {actividad.descripcion}
                          </td>
                          <td className="border-x border-secondary px-3 leading-tight py-1">
                            {actividad.evidencia}
                          </td>
                          {actividad.actividadProcesos?.map(
                            (actividadProceso, index) => {
                              return (
                                <td
                                  className={` text-center ${
                                    actividadProceso.estado == "Completada"
                                      ? "bg-primarybg"
                                      : ""
                                  }`}
                                >
                                  <span
                                    className={`w-6 h-6 cursor-pointer ${
                                      actividadProceso.estado == "Completada"
                                        ? "bg-primary"
                                        : " border-2  "
                                    } rounded-md flex mx-auto items-center justify-center`}
                                    onClick={() => {
                                      if (
                                        actividadProceso.estado != "Completada"
                                      ) {
                                        onCheck({
                                          id: actividadProceso.id,
                                          nombre: actividad.evidencia,
                                        });
                                        return;
                                      }

                                      actividadProceso.evidenciaId
                                        ? window.open(
                                            `https://drive.google.com/file/d/${actividadProceso.evidenciaId}/view?usp=sharing`
                                          )
                                        : actividadProceso.evidenciaUrl
                                        ? window.open(
                                            actividadProceso.evidenciaUrl
                                          )
                                        : window.open(
                                            `https://drive.google.com/drive/folders/${etapa.procesos[index].driveId}`
                                          );
                                    }}
                                  >
                                    <svg
                                      width="16"
                                      height="12"
                                      viewBox="0 0 16 12"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M1 6L6 11L15 1" stroke="white" />
                                    </svg>
                                  </span>
                                </td>
                              );
                            }
                          )}
                        </tr>
                      </>
                    );
                  })}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
