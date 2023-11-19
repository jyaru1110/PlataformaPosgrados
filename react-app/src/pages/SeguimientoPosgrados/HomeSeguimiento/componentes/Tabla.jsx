import ProgressCircle from "./ProgressCircle";
import ProgressStatus from "./ProgressStatus";

export default function Tabla(props) {
  const procesos = props.procesos;
  const loading = props.loading;
  const setShow = props.setShow;

  return (
    <div className="w-full self-center flex justify-center">
      <div className="w-5/6 flex flex-col items-start">
        <h1 className="font-seravek text-primary font-semibold text-xl mt-10">
          Posgrados
        </h1>
        <button
          className="self-end py-2 px-10 rounded-md text-sm font-seravek font-medium bg-primary text-white"
          onClick={() => setShow(true)}
        >
          NUEVO PROCESO
        </button>
        <table className="table-auto font-seravek w-full mt-5 font-light text-sm overflow-x-scroll">
          <thead>
            <tr className="text-secondary border-y border-secondary text-center space-x-5">
              <td className="py-3 text-left">Nombre del programa</td>
              <td>Siglas</td>
              <td>Campus</td>
              <td>Escuela</td>
              <td>Tipo</td>
              <td className="w-36">Modalidad</td>
              <td>Duración</td>
              <td>Etapa 1</td>
              <td>Etapa 2</td>
              <td>Etapa 3</td>
              <td>Etapa 4</td>
              <td>Etapa 5</td>
              <td>Etapa 6</td>
              <td>Estatus</td>
              <td>Notas</td>
              <td>Inicio trámite</td>
              <td>Aprobación SEP</td>
              <td>Próxima actualización</td>
            </tr>
          </thead>
          <tbody>
            {loading ? null : (
              <>
                {procesos.length > 0
                  ? procesos.map((proceso) => {
                      return (
                        <tr
                          className="border-b border-secondary"
                          key={proceso.id}
                        >
                          <td className="py-3 w-60 leading-tight">
                            {proceso.programa.programa}
                          </td>
                          <td className="text-center w-20">
                            {proceso.programa.codigo}
                          </td>
                          <td className="text-center w-20">Mixcoac</td>
                          <td className="text-center w-28">
                            {proceso.programa.escuela}
                          </td>
                          <td className="text-center w-24">{proceso.tipo}</td>
                          <td className="text-center w-24">
                            {proceso.programa.modalidad}
                          </td>
                          <td className="text-center w-16">
                            {proceso.programa.duracion} meses
                          </td>
                          <td className="w-24">
                            <ProgressCircle
                              porcentaje={
                                proceso.etapas[0].etapaProceso.porcentaje
                              }
                            />
                          </td>
                          <td className="w-24">
                            <ProgressCircle
                              porcentaje={
                                proceso.etapas[1].etapaProceso.porcentaje
                              }
                            />
                          </td>
                          <td className="w-24">
                            <ProgressCircle
                              porcentaje={
                                proceso.etapas[2].etapaProceso.porcentaje
                              }
                            />
                          </td>
                          <td className="w-24">
                            <ProgressCircle
                              porcentaje={
                                proceso.etapas[3].etapaProceso.porcentaje
                              }
                            />
                          </td>
                          <td className="w-24">
                            <ProgressCircle
                              porcentaje={
                                proceso.etapas[4].etapaProceso.porcentaje
                              }
                            />
                          </td>
                          <td className="w-24 text-center">
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
                          <td className="w-24">
                            <ProgressStatus porcentaje={proceso.porcentaje} />
                          </td>
                          <td className="pl-1.5">{proceso.notas}</td>
                          <td className="text-center w-28">
                            {proceso.fecha_inicio_sep?.substring(0, 10)}
                          </td>
                          <td className="text-center w-28">
                            {proceso.fecha_aprobacion?.substring(0, 10)}
                          </td>
                          <td className="text-center w-28">
                            {proceso.fecha_proxima_actualizacion?.substring(
                              0,
                              10
                            )}
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
