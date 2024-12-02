import Header from "../components/Header";
import Main from "../../components/Main";
import Table from "../../components/Table";
import { useState, useEffect, useRef } from "react";
import { usePersonas } from "../../../../hooks/usePersonas";
import { useNavigate, Link } from "react-router-dom";
import Filter from "../../components/Filter";
import { puestosInterceptionNotZero } from "../../../../utils/arrays";
import CardsPersonas from "../components/CardsPersonas";
import useSearchKey from "../../../../hooks/useSearchKey";
import { CSVLink } from "react-csv";
import CardsPuesto from "../../components/CardsPuesto";
import { escuelas, puestos, puestos_program} from "../../constantes";
import ModalPuestos from "../components/ModalPuestos";

const headers = [
  "Titulo",
  "Persona",
  "Escuela, facultad o área",
  "Correo",
  "ID",
  "Extensión",
  "Cumpleaños",
  "Teléfono",
];


export default function Personas() {
  const [query, setQuery] = useState("");
  const { loading, personas } = usePersonas(query);
  const [personasPuesto, setPersonasPuesto] = useState([]);
  const navigate = useNavigate();
  const [filteredEscuelas, setFilteredEscuelas] = useState([]);
  const [filteredPuestos, setFilteredPuestos] = useState([]);
  const [filteredPuestosPrograma, setFilteredPuestosPrograma] = useState([]);
  const [personasReport, setPersonasReport] = useState([]);
  const searchRef = useRef(null);
  const timeOutRef = useRef(null);
  useSearchKey(searchRef);

  const filterPersonas = (persona) => {
    return (
      (filteredEscuelas.length === 0 ||
        filteredEscuelas.includes(persona.escuela)) &&
      (filteredPuestos.length === 0 && filteredPuestosPrograma.length === 0 ||
        puestosInterceptionNotZero(
          filteredPuestos,
          persona?.puesto_escuelas
        )) ||
        puestosInterceptionNotZero(
          filteredPuestosPrograma,
          persona?.puesto_programas
        )
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

  const map_personas_to_report = (personas) => {
    const persona_copy = personas?.map((persona) => ({ ...persona }));
    const transformed_personas = persona_copy?.map((persona) => {
      const reduced_puestos = persona.puesto_escuelas?.reduce((acc, puesto) => {
        return acc + puesto.puesto + "\n";
      }, "");
      const reduced_puestos_programa = persona.puesto_programas?.reduce(
        (acc, puesto) => {
          return acc + puesto.puesto + " - " + puesto.programaPrograma + "\n";
        },
        ""
      );
      delete persona.puesto_escuelas;
      delete persona.id;
      delete persona.foto;
      delete persona.area;
      delete persona.puesto_programas;
      delete persona.id_universidad_panamericana;
      return {
        ...persona,
        puestos_programa: reduced_puestos_programa,
        puestos_escuela: reduced_puestos,
      };
    });

    return transformed_personas;
  };

  useEffect(() => {
    setPersonasReport(map_personas_to_report(personas.filter(filterPersonas)));
  }, [personas, filteredEscuelas, filteredPuestos, filteredPuestosPrograma]);

  return (
    <div className="w-5/6 flex flex-col relative h-screen">
      <Header title="Directorio">
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
        <Filter
          title={"Puestos Programa"}
          options={puestos_program}
          setFiltered={setFilteredPuestosPrograma}
          filtered={filteredPuestosPrograma}
        ></Filter>
        <CSVLink
          filename="reporte_personas"
          data={personasReport}
          className="bg-primary text-white/90 px-3 rounded-lg flex items-center space-x-3"
        >
          <svg
            className="opacity-90"
            width="20"
            height="20"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.25 17.5C25.9185 17.5 25.6005 17.6317 25.3661 17.8661C25.1317 18.1005 25 18.4185 25 18.75V23.75C25 24.0815 24.8683 24.3995 24.6339 24.6339C24.3995 24.8683 24.0815 25 23.75 25H6.25C5.91848 25 5.60054 24.8683 5.36612 24.6339C5.1317 24.3995 5 24.0815 5 23.75V18.75C5 18.4185 4.8683 18.1005 4.63388 17.8661C4.39946 17.6317 4.08152 17.5 3.75 17.5C3.41848 17.5 3.10054 17.6317 2.86612 17.8661C2.6317 18.1005 2.5 18.4185 2.5 18.75V23.75C2.5 24.7446 2.89509 25.6984 3.59835 26.4017C4.30161 27.1049 5.25544 27.5 6.25 27.5H23.75C24.7446 27.5 25.6984 27.1049 26.4017 26.4017C27.1049 25.6984 27.5 24.7446 27.5 23.75V18.75C27.5 18.4185 27.3683 18.1005 27.1339 17.8661C26.8995 17.6317 26.5815 17.5 26.25 17.5ZM14.1125 19.6375C14.2314 19.7513 14.3716 19.8405 14.525 19.9C14.6746 19.9661 14.8364 20.0003 15 20.0003C15.1636 20.0003 15.3254 19.9661 15.475 19.9C15.6284 19.8405 15.7686 19.7513 15.8875 19.6375L20.8875 14.6375C21.1229 14.4021 21.2551 14.0829 21.2551 13.75C21.2551 13.4171 21.1229 13.0979 20.8875 12.8625C20.6521 12.6271 20.3329 12.4949 20 12.4949C19.6671 12.4949 19.3479 12.6271 19.1125 12.8625L16.25 15.7375V3.75C16.25 3.41848 16.1183 3.10054 15.8839 2.86612C15.6495 2.6317 15.3315 2.5 15 2.5C14.6685 2.5 14.3505 2.6317 14.1161 2.86612C13.8817 3.10054 13.75 3.41848 13.75 3.75V15.7375L10.8875 12.8625C10.771 12.746 10.6326 12.6535 10.4803 12.5904C10.328 12.5273 10.1648 12.4949 10 12.4949C9.83518 12.4949 9.67197 12.5273 9.51969 12.5904C9.36741 12.6535 9.22905 12.746 9.1125 12.8625C8.99595 12.979 8.9035 13.1174 8.84043 13.2697C8.77735 13.422 8.74489 13.5852 8.74489 13.75C8.74489 13.9148 8.77735 14.078 8.84043 14.2303C8.9035 14.3826 8.99595 14.521 9.1125 14.6375L14.1125 19.6375Z"
              fill="white"
            />
          </svg>
          <span className="font-normal">Descargar reporte</span>
        </CSVLink>
      </Header>
      <Main>
        <CardsPuesto setPersonasPuesto={setPersonasPuesto} />
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
      <ModalPuestos
        miembros={personasPuesto}
        close={()=>setPersonasPuesto([])}
      />
    </div>
  );
}
