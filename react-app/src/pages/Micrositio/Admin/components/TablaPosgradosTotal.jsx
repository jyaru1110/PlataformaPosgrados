import Table from "../../components/Table";
import { useTotalPosgrados } from "../../../../hooks/useTotalPosgrados";
import SmallSkeletonTable from "../../components/SmallSkeletonTable";

export default function TablaPosgradosTotal(escuelas) {
  const { data, loading, error } = useTotalPosgrados(escuelas);
  const total = data?.reduce((acc, programa) => acc + parseInt(programa.total), 0);
  return (
    <span>
      <h2 className="ml-2 font-bold text-2xl mb-1">Total posgrados</h2>
      {!loading? (
        <Table headers={["Tipo", "Número"]}>
          {data?.map((programa, index) => {
            return (
              <tr key={index}>
                <td className="pr-10 pl-2 text-base">{programa?.grado || 'Sin grado'}</td>
                <td className="pr-10 pl-2 font-bold text-base">{programa.total}</td>
              </tr>
            );
          })}
          <tr className="border-t border-grayborder">
            <td className="pr-10 pl-2 text-base">Total</td>
            <td className="pr-10 pl-2 font-bold text-base">{total}</td>
          </tr>
        </Table>
      ):<SmallSkeletonTable/>}
    </span>
  );
}
