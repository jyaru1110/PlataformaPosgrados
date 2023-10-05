import ProgressCircle from "./ProgressCircle";

export default function Tabla(props) {
  const procesos = props.procesos;
  const loading = props.loading;

  return (
    <div className="w-full self-center flex justify-center">
      <div className="w-5/6 flex flex-col items-start">
        <h1 className="font-seravek text-primary font-semibold text-xl mt-10">
          Posgrados
        </h1>
        <button className="self-end py-2 px-10 rounded-md text-sm font-seravek font-medium bg-primary text-white">
          NUEVO PROCESO
        </button>
        <table className="table-auto font-seravek w-full mt-5 font-light text-sm">
          <thead>
            <tr className="text-secondary border-y border-secondary">
              <td className="py-3">Nombre del programa</td>
              <td>Siglas</td>
              <td>Campus</td>
              <td>Escuela</td>
              <td>Tipo</td>
              <td>Modalidad</td>
              <td>Duración</td>
              <td>Etapa 1</td>
              <td>Etapa 2</td>
              <td>Etapa 3</td>
              <td>Etapa 4</td>
              <td>Etapa 5</td>
              <td>Etapa 6</td>
              <td>Estatus</td>
              <td>Notas adicionales</td>
              <td>Fecha inicio trámite</td>
              <td>Fecha aprobación SEP</td>
              <td>Fecha próxima actualización</td>
            </tr>
          </thead>
          <tbody>
            {loading ? null : (
              <>
                {procesos.map((proceso) => {
                  return (
                    <tr className="border-b border-secondary" key={proceso.id}>
                      <td className="py-3">{proceso.programa.programa}</td>
                      <td>{proceso.programa.codigo}</td>
                      <td>Mixcoac</td>
                      <td>{proceso.programa.escuela}</td>
                      <td>{proceso.tipo}</td>
                      <td>{proceso.programa.modalidad}</td>
                      <td>18 meses</td>
                      <td>
                        <ProgressCircle
                          porcentaje={proceso.etapas[0].etapaProceso.porcentaje}
                        />
                      </td>
                      <td>
                        <ProgressCircle
                          porcentaje={proceso.etapas[1].etapaProceso.porcentaje}
                        />
                      </td>
                      <td>
                        <ProgressCircle
                          porcentaje={proceso.etapas[2].etapaProceso.porcentaje}
                        />
                      </td>
                      <td>
                        <ProgressCircle
                          porcentaje={proceso.etapas[3].etapaProceso.porcentaje}
                        />
                      </td>
                      <td>
                        <ProgressCircle
                          porcentaje={70}
                        />
                      </td>
                      <td>
                        {proceso.tipo == "Nuevo" ? (
                          <ProgressCircle
                            porcentaje={
                              proceso.etapas[5].etapaProceso.porcentaje
                            }
                          />
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td>{proceso.estado}</td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
