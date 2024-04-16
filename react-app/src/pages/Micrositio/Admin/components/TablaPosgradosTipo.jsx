import Table from "../../components/Table";

export default function TablaPosgradosTipo() {
  return (
    <span>
      <h1>Posgrados por Tipo</h1>
      <Table headers={['Tipo','Número']} />
    </span>
  );
}
