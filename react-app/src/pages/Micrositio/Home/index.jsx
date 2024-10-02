import Main from "../components/Main";
import { useState } from "react";
import { usePersonas } from "../../../hooks/usePersonas";
import Table from "../components/Table";
import Filter from "../components/Filter";
import { puestosInterceptionNotZero } from "../../../utils/arrays";
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
        <div className="mt-20 flex space-x-4">
          <div className="w-72 h-32 bg-white shadow-md rounded-lg p-2">
            <span className="flex justify-between items-center">
              <p className="font-bold text-lg">Directores E/F</p>
              <button className="border border-grayborder rounded-lg p-1">
                Copiar correos
              </button>
            </span>
            <button className="border border-grayborder rounded-lg p-1">
              Ver miembros
            </button>
          </div>
          <div className="w-60 h-32 bg-white shadow-md rounded-lg p-2">
            <span>
              <p className="font-bold text-lg leading-tight">
                Coordinador de Asuntos Estudiantiles
              </p>
              <button className="border border-grayborder rounded-lg p-1">
                Copiar correos
              </button>
            </span>

            <button className="border border-grayborder rounded-lg p-1">
              Ver miembros
            </button>
          </div>
          <div className="w-60 h-32 bg-white shadow-md rounded-lg p-2">
            <p className="font-bold text-lg leading-tight">
              Coordinador Gestión Escolar
            </p>
            <button className="border border-grayborder rounded-lg p-1">
              Copiar correos
            </button>
            <button className="border border-grayborder rounded-lg p-1">
              Ver miembros
            </button>
          </div>
        </div>
        <div className="mt-20 space-y-4 p-3 shadow-lg bg-white rounded-2xl">
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
    </div>
  );
}
