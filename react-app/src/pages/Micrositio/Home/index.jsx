import Main from "../components/Main";
import { useState } from "react";
import { usePersonas } from "../../../hooks/usePersonas";
import Table from "../components/Table";
import Filter from "../components/Filter";
import { puestosInterceptionNotZero } from "../../../utils/arrays";
import CardsPuesto from "../components/CardsPuesto";
import ModalPuestos from "../Admin/components/ModalPuestos";
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

export default function HomeMicrosito() {
  const { loading, personas } = usePersonas("Todos");
  const [personasPuesto, setPersonasPuesto] = useState([]);
  const [filteredEscuelas, setFilteredEscuelas] = useState([]);
  const [filteredPuestos, setFilteredPuestos] = useState([]);

  const filterPersonas = (persona) => {
    return (
      (filteredEscuelas.length === 0 ||
        filteredEscuelas.includes(persona.escuela)) &&
      (filteredPuestos.length === 0 ||
        puestosInterceptionNotZero(filteredPuestos, persona.puesto_escuelas))
    );
  }
  return (
    <div className="w-full h-screen overflow-y-auto">
      <Main>
        <h1 className="text-3xl font-bold">
          ¡Bienvenido, {localStorage.getItem("nombre")}! 🚀
        </h1>
        <CardsPuesto setPersonasPuesto={setPersonasPuesto}/>
        <div className="mt-10 space-y-4 p-3 shadow-lg bg-white rounded-2xl">
          <div className="flex space-x-2">
            <h2 className="ml-3 text-2xl font-bold">Personas</h2>
            <input
              placeholder="Buscar"
              className="rounded-lg w-auto px-2 py-1 border border-grayborder"
            ></input>
              <Filter title={"Escuela"} options={escuelas} filtered={filteredEscuelas} setFiltered={setFilteredEscuelas}/>
              <Filter title={"Puestos"} options={puestos} filtered={filteredPuestos} setFiltered={setFilteredPuestos}/>
          </div>
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
                <td className="px-2 py-1">{persona.area?persona.area:persona.escuela}</td>
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
        </div>
      </Main>
      <ModalPuestos miembros={personasPuesto} close={()=>setPersonasPuesto([])} />
    </div>
  );
}
