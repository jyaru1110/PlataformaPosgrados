import Header from "../../components/Header";
import Main from "../../components/Main";
import Table from "../../components/Table";
import { useState, useRef} from "react";
import { usePersonas } from "../../../../hooks/usePersonas";
import { useNavigate, Link } from "react-router-dom";
import Filter from "../../components/Filter";
import { puestosInterceptionNotZero } from "../../../../utils/arrays";
import CardsPersonas from "../components/CardsPersonas";

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

const escuelas = [
  "Gobierno y Economía",
  "Bellas Artes",
  "Derecho",
  "Empresariales",
  "ESDAI",
  "Filosofía",
  "Ingeniería",
  "Comunicación",
  "Pedagogía",
  "Empresariales Santa Fe",
  "Ciencias de la Salud",
];

const puestos = [
  "Coordinador Gestión Escolar",
  "Subdirector Posgrado",
  "Coordinador de Asuntos Estudiantiles",
  "Secretario Administrativo",
  "Director Posgrado",
  "Jefe Promoción y Admisiones",
  "Decano",
];

export default function Personas() {
  const [query, setQuery] = useState("");
  const { loading, personas } = usePersonas(query);
  const navigate = useNavigate();
  const [filteredEscuelas, setFilteredEscuelas] = useState([]);
  const [filteredPuestos, setFilteredPuestos] = useState([]);
  const searchRef = useRef(null);
  const timeOutRef = useRef(null);

  const filterPersonas = (persona) => {
    return (
      (filteredEscuelas.length === 0 ||
        filteredEscuelas.includes(persona.escuela)) &&
      (filteredPuestos.length === 0 ||
        puestosInterceptionNotZero(filteredPuestos, persona.puesto_escuelas))
    );
  };

  const search = () => {
    if (timeOutRef.current === null) {
      timeOutRef.current = setTimeout(() => {
        setQuery(searchRef.current.value);
        timeOutRef.current = null;
      }, 1100);
    }
  };

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
          onChange={search}
          ref={searchRef}
          placeholder="Buscar"
          className="rounded-lg px-3 py-1 border border-grayborder justify-self-end"
        ></input>
        <Filter
          title={"Escuela"}
          filtered={filteredEscuelas}
          setFiltered={setFilteredEscuelas}
          options={escuelas}
        />
        <Filter
          title={"Puesto"}
          filtered={filteredPuestos}
          setFiltered={setFilteredPuestos}
          options={puestos}
        />
      </Header>
      <Main>
        <CardsPersonas />
        <Table headers={headers} loading={loading}>
          {personas.filter(filterPersonas).map((persona, index) => (
            <tr
              className="border-b border-grayborder hover:bg-grayborder cursor-pointer transition-all ease-in-out duration-300"
              key={index}
              onClick={() => {
                navigate(`/micrositio/admin/personas/${persona.id}`);
              }}
            >
              <td className="px-2 py-1">{persona.titulo}</td>
              <td className="px-2 py-1 flex items-center">
                {persona.foto ? (
                  <img
                    className="rounded-full mr-2"
                    height={20}
                    width={20}
                    src={persona.foto}
                  />
                ) : null}
                {persona.nombre}
              </td>
              <td className="px-2 py-1">
                {persona.area ? persona.area : persona.escuela}
              </td>
              <td className="px-2 py-1">{persona.email}</td>
              <td className="px-2 py-1">
                {persona.id_universidad_panamericana}
              </td>
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
