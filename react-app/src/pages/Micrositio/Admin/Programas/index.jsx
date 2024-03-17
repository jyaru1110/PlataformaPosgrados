import Header from "../../components/Header";
import Main from "../../components/Main";
import Table from "../../components/Table";
import { useProgramas } from "../../../../hooks/useProgramas";
import { Link } from "react-router-dom";

const headers = [
  "Programa",
  "Grado",
  "Escuela",
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
  const data_array = programas.map((programa) => Object.values(programa));
  return (
    <div className="w-full flex flex-col relative h-screen">
      <Header title="Programas">
        <Link to='/microsito/programa/new' className="bg-primary text-center flex items-center text-white rounded-lg px-3">Nuevo</Link>
        <input placeholder="Buscar" className="rounded-lg px-3 py-1 border border-grayborder justify-self-end"></input>
      </Header>
      <Main>
        <Table
          headers={headers}
          data={data_array}
          loading={loading}
          route={"/micrositio/programa/"}
        />
      </Main>
    </div>
  );
}
