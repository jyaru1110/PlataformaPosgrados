import Header from "../../components/Header";
import Main from "../../components/Main";
import Table from "../../components/Table";
import { usePeriodoPrograma } from "../../../../hooks/usePeriodoPrograma";

const headers = [
  "Periodo",
  "Programa",
  "Meta Alumnos",
  "Inscritos",
  "Porcentaje",
];

export default function Metas() {
  const { loading, metas, update } = usePeriodoPrograma("Todos");
  return (
    <div className="w-full flex flex-col relative h-screen">
      <Header title="Metas"/>
      <Main>
        <Table headers={headers} loading={loading}>
          {metas.map((meta, index) => (
            <tr
              className="border-b border-grayborder hover:bg-grayborder cursor-pointer transition-all ease-in-out duration-300"
              key={index}
            >
              <td className="px-2 py-1">{meta?.periodo?.periodo_nombre}</td>
              <td className="px-2 py-1">{meta?.programaPrograma}</td>
              <td className="px-2 py-1">{meta?.meta_inscripciones}</td>
              <td className="px-2 py-1">{meta?.num_inscripciones}</td>
              <td className="px-2 py-1 font-bold">{((meta?.num_inscripciones/meta?.meta_inscripciones)*100)?.toFixed(2)}%</td>
            </tr>
          ))}
        </Table>
      </Main>
    </div>
  );
}
