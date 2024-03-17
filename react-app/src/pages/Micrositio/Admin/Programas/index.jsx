import Header from "../../components/Header";
import Main from "../../components/Main";
import Table from "../../components/Table";
import { useProgramas } from "../../../../hooks/useProgramas";

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
  const data_array = programas.map((programa) => Object.values(programa));
  return (
    <div className="w-full  flex flex-col">
      <Header title="Programas" />
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
