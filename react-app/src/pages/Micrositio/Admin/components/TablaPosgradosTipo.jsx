import Table from "../../components/Table";
import { useProgramasTipo } from "../../../../hooks/useProgramasTipo";

export default function TablaPosgradosTipo(escuelas) {
  const { data, loading, error } = useProgramasTipo(escuelas);
  return (
    <span>
      <h1>Posgrados por Tipo</h1>
      {!loading && (
        <Table headers={["Tipo", "Número"]}>
          {data?.map((programa, index) => {
            return (
              <tr key={index}>
                <td className="pr-10 pl-2">{programa?.tipo || "Sin tipo"}</td>
                <td className="pr-10 pl-2">{programa.total}</td>
              </tr>
            );
          })}
        </Table>
      )}
    </span>
  );
}
