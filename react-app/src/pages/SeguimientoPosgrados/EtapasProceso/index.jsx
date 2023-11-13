import { useEtapasproceso } from "../../../hooks/useEtapasProcesos";
import Header from "../componentes/Header";
import Upload from "./Upload";
import { setEvidenciaId } from "./Upload";
import { useSearchParams } from "react-router-dom";

export default function EtapasProceso() {
  const [tipo, setTipo] = useSearchParams();
  const etapas = useEtapasproceso(tipo.get("tipo"));

  const onCheck = (evidenciaId) => {
    setEvidenciaId(evidenciaId);
  };

  return (
    <div>
      <Upload />
      <Header titulo="Nuevos programas y actualizaciones"></Header>
      <table className="font-seravek mt-5">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            {etapas.length > 0
              ? etapas[0].procesos.map((proceso) => {
                  return (
                    <th
                      key={proceso.id}
                      className="font-timesnr text-primary w-60"
                    >
                      {proceso.programaPrograma?.toUpperCase()}
                    </th>
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
                    className="font-timesnr text-left py-4 pl-5 font-bold"
                  >{`ETAPA ${
                    etapa.numero
                  }. ${etapa.descripcion?.toUpperCase()}`}</td>
                  <td></td>
                  {etapa.procesos.map((proceso) => {
                    return (
                      <td className="text-center">
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
                        <td className="px-2 py-1 border-x border-secondary">
                          {actividad.descripcion}
                        </td>
                        <td className="border-x border-secondary px-2 py-1">
                          {actividad.evidencia}
                        </td>
                        {actividad.actividadProcesos?.map(
                          (actividadProceso) => {
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
                                    window.open(
                                      `https://drive.google.com/file/d/${actividadProceso.evidenciaId}/view?usp=sharing`
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
  );
}
