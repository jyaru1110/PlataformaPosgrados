import Table from "../../components/Table";
import { useTotalPosgrados } from "../../../../hooks/useTotalPosgrados";

export default function TablaPosgradosTotal(escuelas) {
  const { data, loading, error } = useTotalPosgrados(escuelas);
  return (
    <span>
      <h2 className="ml-2 font-bold text-2xl">Total posgrados</h2>
      {!loading && (
        <Table headers={["Tipo", "Número"]}>
          {data?.map((programa, index) => {
            return (
              <tr key={index}>
                <td className="pr-10 pl-2 text-base">{programa?.grado || 'Sin grado'}</td>
                <td className="pr-10 pl-2 font-bold text-base">{programa.total}</td>
              </tr>
            );
          })}
        </Table>
      )}
    </span>
  );
}
