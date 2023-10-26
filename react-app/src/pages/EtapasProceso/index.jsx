import { useEtapasproceso } from "../../hooks/useEtapasProcesos";

export default function EtapasProceso() {
  const etapas = useEtapasproceso("Nuevo");
  console.log(etapas);
  return (
    <div>
      {etapas?.map((etapa) => {
        return (
          <>
            <p key={etapa.id}>
              Etapa {etapa.numero}. {etapa.descripcion}
            </p>
            {etapa.etapaProcesos.map((etapaProceso) => {
              return (
                <div key={etapaProceso.id}>
                  <p>
                    {etapaProceso.proceso.programaPrograma}{" "}
                    {etapaProceso.porcentaje}
                  </p>
                </div>
              );
            })}
          </>
        );
      })}
    </div>
  );
}
