import Table from "../../components/Table";
import { useTotalPosgrados } from "../../../../hooks/useTotalPosgrados";

export default function TablaPosgradosTotal(escuelas) {
  const { data, loading, error } = useTotalPosgrados(escuelas);
  console.log(data);
  return (
    <span>
      <h3 className="ml-2">Total posgrados</h3>
      {!loading && (
        <Table headers={["Tipo", "Número"]}>
          {data?.map((programa, index) => {
            console.log(programa);
            return (
              <tr key={index}>
                <td className="pr-10 pl-2">{programa?.grado || 'Sin grado'}</td>
                <td className="pr-10 pl-2">{programa.total}</td>
              </tr>
            );
          })}
        </Table>
      )}
    </span>
  );
}
