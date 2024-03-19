import Header from "../../components/Header";
import Main from "../../components/Main";
import Table from "../../components/Table";
import { usePersonas } from "../../../../hooks/usePersonas";
import { useNavigate, Link } from "react-router-dom";

const headers = [
  "Titulo",
  "Persona",
  "Escuela o facultad",
  "Correo",
  "ID",
  "Extensión",
  "Cumpleaños",
  "Teléfono",
];

export default function Personas() {
  const { loading, personas } = usePersonas("Todos");
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col relative h-screen">
      <Header title="Personas">
        <Link
          to="/micrositio/admin/personas/new"
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
          {personas.map((persona, index) => (
            <tr
              className="border-b border-grayborder hover:bg-grayborder cursor-pointer transition-all ease-in-out duration-300"
              key={index}
              onClick={() => {
                navigate(`/micrositio/admin/personas/${persona.id}`);
              }}
            >
              <td className="px-2 py-1">{persona.titulo}</td>
              <td className="px-2 py-1 flex items-center">
                {persona.foto?<img className="rounded-full mr-2" height={20} width={20} src={persona.foto}/>:null}
                {persona.nombre}
              </td>
              <td className="px-2 py-1">{persona.escuela}</td>
              <td className="px-2 py-1">{persona.email}</td>
              <td className="px-2 py-1">{persona.id_universidad_panamericana}</td>
              <td className="px-2 py-1">{persona.extension}</td>
              <td className="px-2 py-1">{persona.birthday}</td>
              <td className="px-2 py-1">{persona.telefono}</td>
            </tr>
          ))}
        </Table>
      </Main>
    </div>
  );
}
