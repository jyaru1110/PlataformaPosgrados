import Table from "../../components/Table";
import { useProgramasTipo } from "../../../../hooks/useProgramasTipo";

export default function TablaPosgradosTipo(escuelas) {
  const { data, loading, error } = useProgramasTipo(escuelas);
  return (
    <span>
      <h2 className="ml-2 font-bold text-2xl">Posgrados por Tipo</h2>
      {!loading && (
        <Table headers={["Tipo", "Número"]}>
          {data?.map((programa, index) => {
            return (
              <tr key={index}>
                <td className="pr-10 pl-2 text-base">{programa?.tipo || "Sin tipo"}</td>
                <td className="pr-10 pl-2 font-bold text-base">{programa.total}</td>
              </tr>
            );
          })}
        </Table>
      )}
    </span>
  );
}
