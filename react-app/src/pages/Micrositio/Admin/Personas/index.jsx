import Header from "../../components/Header";
import Main from "../../components/Main";
import Table from "../../components/Table";

const data = [
  ["Persona 1", "Descripción 1"],
  ["Persona 2", "Descripción 2"],
  ["Persona 3", "Descripción 3"],
];
const headers = ["Nombre", "Descripción"];

export default function Personas() {
  return (
    <div className="w-full  flex flex-col">
      <Header title="Personas" />
      <Main>
        <Table headers={headers} data={data} route={'/micrositio/persona/'} />
      </Main>
    </div>
  );
}
