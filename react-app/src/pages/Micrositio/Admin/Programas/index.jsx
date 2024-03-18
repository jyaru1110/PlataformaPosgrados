import Header from "../../components/Header";
import Main from "../../components/Main";
import Table from "../../components/Table";
import { useProgramas } from "../../../../hooks/useProgramas";
import { useNavigate, Link } from "react-router-dom";

const headers = [
  "Escuela",
  "Grado",
  "Programa",
  "Código",
  "Sede",
  "Tipo",
  "Modalidad",
  "Duración",
  "Créditos",
  "Año de inicio",
  "# materias",
  "# materias ingles",
  "rvoe",
  "fecha",
];

export default function Programas() {
  const { loading, programas } = useProgramas("Todos");
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col relative h-screen">
      <Header title="Programas">
        <Link
          to="/micrositio/admin/programas/new"
          className="bg-primary text-center flex items-center text-white rounded-lg px-3"
        >
          Nuevo
        </Link>
        <input
          placeholder="Buscar"
          className="rounded-lg px-3 py-1 border border-grayborder justify-self-end"
        ></input>
      </Header>
      <Main>
        <Table headers={headers} loading={loading}>
          {programas.map((programa, index) => (
            <tr
              className="border-b border-grayborder hover:bg-grayborder cursor-pointer transition-all ease-in-out duration-300"
              key={index}
              onClick={() => {
                navigate(`/micrositio/admin/programas/${programa.programa}`);
              }}
            >
              <td className="px-2 py-1">{programa.escuela}</td>
              <td className="px-2 py-1">{programa.grado}</td>
              <td className="px-2 py-1">{programa.programa}</td>
              <td className="px-2 py-1">{programa.codigo}</td>
              <td className="px-2 py-1">{programa.sede}</td>
              <td className="px-2 py-1">{programa.tipo}</td>
              <td className="px-2 py-1">{programa.modalidad}</td>
              <td className="px-2 py-1">{programa.duracion}</td>
              <td className="px-2 py-1">{programa.creditos}</td>
              <td className="px-2 py-1">{programa.year_inicio}</td>
              <td className="px-2 py-1">{programa.num_materias}</td>
              <td className="px-2 py-1">{programa.num_materias_ingles}</td>
              <td className="px-2 py-1">{programa.rvoe}</td>
              <td className="px-2 py-1">
                {programa.fecha_rvoe?.substring(0, 10)}
              </td>
            </tr>
          ))}
        </Table>
      </Main>
    </div>
  );
}
