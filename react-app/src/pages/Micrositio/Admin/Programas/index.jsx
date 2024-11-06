import Header from "../components/Header";
import Main from "../../components/Main";
import Table from "../../components/Table";
import TablaPosgradosTipo from "../components/TablaPosgradosTipo";
import TablaPosgradosTotal from "../components/TablaPosgradosTotal";
import { useProgramas } from "../../../../hooks/useProgramas";
import { useNavigate, Link } from "react-router-dom";
import Filter from "../../components/Filter";
import { useState,useRef} from "react";
import useSearchKey from "../../../../hooks/useSearchKey";

const headers = [
  "E/F",
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
  "# materias inglés",
  "rvoe",
  "fecha",
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

const sedes = [
  "Mixcoac",
  "Santa Fe"
]

export default function ProgramasAdmin() {
  const [query, setQuery] = useState("");
  const { loading, programas } = useProgramas(query);
  const [filteredEscuelas, setFilteredEscuelas] = useState([]);
  const [filterSede, setFilterSede] = useState([]);
  const [filteredGrado, setFilteredGrado] = useState([]);
  const [filteredTipo, setFilteredTipo] = useState([])
  const [filteredModalidad, setFilteredModalidad] = useState([])
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const timeOutRef = useRef(null);
  
  useSearchKey(searchInputRef);

  const filterProgramas = (programa) => {
    return (filteredEscuelas.length === 0 || filteredEscuelas.includes(programa.escuela)) && 
    (filterSede.length === 0 || filterSede.includes(programa.campus)) &&
    (filteredGrado.length === 0 || filteredGrado.includes(programa.grado)) &&
    (filteredTipo.length === 0 || filteredTipo.includes(programa.tipo)) &&
    (filteredModalidad.length === 0 || filteredModalidad.includes(programa.modalidad))
  }
  
  const search = () => {
    if(timeOutRef.current === null) {
      timeOutRef.current = setTimeout(()=>{
        setQuery(searchInputRef.current.value)
        timeOutRef.current = null
      },1100);
    }
  }

  return (
    <div className="w-5/6 flex flex-col relative h-screen">
      <Header title="Programas">
        <Link
          to="/micrositio/admin/programas/new"
          className="bg-primary text-center flex items-center text-white rounded-lg px-3"
        >
          Nuevo
        </Link>
        <input
          ref = {searchInputRef}
          onChange={search}
          placeholder="Buscar"
          className="rounded-lg px-3 py-1 border border-grayborder justify-self-end"
        ></input>
        <Filter title={"Escuela"} filtered={filteredEscuelas} setFiltered={setFilteredEscuelas} options={escuelas}/>
        <Filter title={"Sede"} filtered={filterSede} setFiltered={setFilterSede} options={sedes}/>
        <Filter title={"Grado"} filtered={filteredGrado} setFiltered={setFilteredGrado} options={["Maestría", "Doctorado","Especialidad","Diplomado","Curso"]}/>
        <Filter title={"Tipo"} filtered={filteredTipo} setFiltered={setFilteredTipo} options={["Investigación","Profesionalizante","Directiva"]}/>
        <Filter title={"Modalidad"} filtered={filteredModalidad} setFiltered={setFilteredModalidad} options={["Blended / Mixta","Mixta","Presencial"]}/>
      </Header>
      <Main>
        <article className="flex w-full justify-between mb-6">
          <TablaPosgradosTotal escuelas={filteredEscuelas.length>0?filteredEscuelas:escuelas} />
          <TablaPosgradosTipo escuelas={filteredEscuelas.length>0?filteredEscuelas:escuelas} />
        </article>
        <Table headers={headers} loading={loading}>
        {programas.filter(filterProgramas).map((programa, index) => 
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
              <td className="px-2 py-1">{programa.campus}</td>
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
            </tr>)}
        </Table>
      </Main>
    </div>
  );
}
