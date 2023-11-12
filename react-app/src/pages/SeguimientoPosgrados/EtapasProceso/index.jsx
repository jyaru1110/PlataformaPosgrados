import { useEtapasproceso } from "../../../hooks/useEtapasProcesos";
import Header from "../componentes/Header";
import Upload from "./Upload";
import { setEvidenciaId } from "./Upload";

export default function EtapasProceso() {
  const etapas = useEtapasproceso("Nuevo");

  const onCheck = (evidenciaId) => {
    setEvidenciaId(evidenciaId);
  };

  return (
    <div>
      <Header titulo="Nuevos programas y actualizaciones"></Header>
      <Upload />
      <table className="font-seravek">
        <thead>
          <tr>
            <th></th>
            <th></th>
            {etapas.length > 0
              ? etapas[0].procesos.map((proceso) => {
                  return (
                    <th className="font-timesnr text-primary w-60">
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
                <tr className="bg-primary text-white">
                  <td className="font-timesnr text-left py-4 pl-5 font-bold">{`ETAPA ${
                    etapa.numero
                  }. ${etapa.descripcion?.toUpperCase()}`}</td>
                  <td></td>
                  {etapa.procesos.map((proceso) => {
                    return (
                      <td className="text-center">
                        {proceso.etapaProceso.porcentaje}%
                      </td>
                    );
                  })}
                </tr>
                {etapa.actividads?.map((actividad) => {
                  return (
                    <>
                      <tr>
                        <td
                          rowSpan={actividad.evidencia.length + 1}
                          className="px-2 py-1"
                        >
                          {actividad.numero}. {actividad.descripcion}
                        </td>
                      </tr>
                      {actividad.evidencia.map((evidencia) => {
                        return (
                          <tr className="border-b border-secondary">
                            <td className="border-x border-secondary px-2 py-1">
                              {evidencia.nombre?.toUpperCase()}
                            </td>
                            {evidencia.evidenciaProcesos.map(
                              (evidenciaProceso) => {
                                return (
                                  <td
                                    className={` text-center ${
                                      evidenciaProceso.estado == "Completada"
                                        ? "bg-primarybg"
                                        : ""
                                    }`}
                                  >
                                    <span
                                      className={`w-6 h-6 ${
                                        evidenciaProceso.estado == "Completada"
                                          ? "bg-primary"
                                          : " border-2  cursor-pointer"
                                      } rounded-md flex mx-auto items-center justify-center`}
                                      onClick={() => {
                                        if (
                                          evidenciaProceso.estado !=
                                          "Completada"
                                        )
                                          onCheck({
                                            id: evidenciaProceso.id,
                                            nombre: evidencia.nombre,
                                          });
                                      }}
                                    >
                                      <svg
                                        width="16"
                                        height="12"
                                        viewBox="0 0 16 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M1 6L6 11L15 1"
                                          stroke="white"
                                        />
                                      </svg>
                                    </span>
                                  </td>
                                );
                              }
                            )}
                          </tr>
                        );
                      })}
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
