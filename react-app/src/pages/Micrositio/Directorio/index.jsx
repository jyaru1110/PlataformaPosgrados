import Header from "../components/Header";
import Main from "../components/Main";
import Buscador from "../components/Buscador";
import { useState, useRef, useEffect} from "react";
import Filter from "../components/Filter";
import { escuelas, puestos, puestos_program, areas } from "../constantes";
import { usePersonas } from "../../../hooks/usePersonas";
import { puestosInterceptionNotZero } from "../../../utils/arrays";
import ResumedPuestos from "./Components/ResumedPuestos";
import { CSVLink } from "react-csv";

export default function Directorio() {
  const [query, setQuery] = useState("");
  const downloadRef = useRef(null);
  const { loading, personas } = usePersonas(query);
  const [filteredEscuelas, setFilteredEscuelas] = useState([]);
  const [filteredPuestos, setFilteredPuestos] = useState([]);
  const [filteredPuestosPrograma, setFilteredPuestosPrograma] = useState([]);
  const [personasReport, setPersonasReport] = useState([]);
  const [filteredArea, setFilteredArea] = useState([]);

  const filterPersonas = (persona) => {
    return (
      (filteredArea.length === 0 ||
        filteredArea.includes(persona.area)) &&
      (filteredEscuelas.length === 0 ||
        filteredEscuelas.includes(persona.escuela)) &&
      (
        filteredPuestos.length === 0 && filteredPuestosPrograma.length === 0 ||
        puestosInterceptionNotZero(
            filteredPuestos,
            persona?.puesto_escuelas
        ) ||  
        puestosInterceptionNotZero(
            filteredPuestosPrograma,
            persona?.puesto_programas
        )
      )
    );
  };

  const copyEmailsToClipboard = () => {
    const emails = personas.filter(filterPersonas).map(persona => persona.email).join(", ");
    navigator.clipboard.writeText(emails);
  }

  const downloadCSV = () => {
    const personasFiltered = personas.filter(filterPersonas);
    const personasReport = personasFiltered.map(persona => {
    const reduced_puestos = persona.puesto_escuelas?.reduce((acc, puesto) => {
                                return acc + puesto.puesto + "\n";
                            }, "");
    const reduced_puestos_programa = persona.puesto_programas?.reduce((acc, puesto) => {
                                        return acc + puesto.puesto + " - " + puesto.programaPrograma + "\n";
                            },"");
    return {
        "Titulo": persona.titulo,
        "Nombre": persona.nombre,
        "Escuela": persona.escuela,
        "Correo": persona.email,
        "Extensión": persona.extension,
        "Teléfono": persona.telefono,
        "Puesto_escuela": reduced_puestos,
        "Puesto_programa": reduced_puestos_programa
    }
    });
    setPersonasReport(personasReport);
  }

  useEffect(() => {
    if (personasReport.length > 0) {
      downloadRef.current.link.click();
    }
  }, [personasReport]);

  return (
    <div className="w-5/6 flex flex-col relative h-screen">
      <Header></Header>
      <Main>
        <Buscador setQuery={setQuery}>
          <span>Filtrar por:</span>
          <Filter
            title="Escuela o facultad"
            options={escuelas}
            filtered={filteredEscuelas}
            setFiltered={setFilteredEscuelas}
          />
          <Filter
            title="Puesto Escuela"
            options={puestos}
            filtered={filteredPuestos}
            setFiltered={setFilteredPuestos}
          />
          <Filter
            title="Puesto Programa"
            options={puestos_program}
            filtered={filteredPuestosPrograma}
            setFiltered={setFilteredPuestosPrograma}
          />
          <Filter
            title="Área"
            options={areas}
            filtered={filteredArea}
            setFiltered={setFilteredArea}
          />
          <button onClick={copyEmailsToClipboard}>
            <svg id="Layer_1" height="20" viewBox="0 0 512 512" fill="#00685E" xmlns="http://www.w3.org/2000/svg"><path d="m397.943 83.923h-11.735v-18.6a65.393 65.393 0 0 0 -65.319-65.323h-206.833a65.393 65.393 0 0 0 -65.319 65.319v297.439a65.393 65.393 0 0 0 65.319 65.319h11.736v18.6a65.393 65.393 0 0 0 65.319 65.323h206.832a65.393 65.393 0 0 0 65.32-65.319v-297.439a65.393 65.393 0 0 0 -65.32-65.319zm-283.887 308.154a29.353 29.353 0 0 1 -29.319-29.319v-297.439a29.352 29.352 0 0 1 29.319-29.319h206.833a29.352 29.352 0 0 1 29.319 29.319v18.6h-159.1a65.393 65.393 0 0 0 -65.319 65.319v242.839zm313.207 54.6a29.352 29.352 0 0 1 -29.32 29.323h-206.832a29.352 29.352 0 0 1 -29.319-29.319v-297.439a29.352 29.352 0 0 1 29.319-29.319h206.832a29.353 29.353 0 0 1 29.32 29.319z"/></svg>
          </button>
          <button onClick={downloadCSV}>
            <svg id="Layer_1" height="20" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs"><g width="100%" height="100%" transform="matrix(6.123233995736766e-17,1,-1,6.123233995736766e-17,512.0004692077637,-0.000476837158203125)"><path d="m478.063 75.448v361.105a75.534 75.534 0 0 1 -75.449 75.447h-232.104a18 18 0 0 1 0-36h232.1a39.493 39.493 0 0 0 39.449-39.447v-361.105a39.493 39.493 0 0 0 -39.445-39.448h-232.104a18 18 0 0 1 0-36h232.1a75.534 75.534 0 0 1 75.453 75.448zm-302.592 284.825a18 18 0 1 0 25.455 25.456l117-117a18 18 0 0 0 0-25.456l-117-117a18 18 0 0 0 -25.455 25.456l86.273 86.271h-209.806a18 18 0 1 0 0 36h209.806z" fill="#00685E" fillOpacity="1" stroke="none" strokeOpacity="1"/></g></svg>
          </button>
          <CSVLink ref={downloadRef} className="hidden" data={personasReport} filename={`${(new Date).toLocaleDateString()}_directorio.csv`}></CSVLink>
        </Buscador>
        <div className="mt-7 grid grid-cols-3 gap-4">
            {personas?.filter(filterPersonas).map((persona) => 
                {
                    return (
                        <div className="flex bg-white shadow-header p-5 rounded-lg space-x-3 items-start" key={persona.id}>
                            {persona.foto ? <img className="rounded-full" width={60} height={60} src={persona.foto}></img> : <div className="rounded-full bg-primary h-[60px] w-[60px] text-white font-timesnr flex items-center justify-center text-3xl">{persona.nombre.substring(0,2).toUpperCase()}</div>}
                            <div>
                                <p className="font-timesnr text-primary text-xl leading-none">{persona.titulo} {persona.nombre}</p>
                                <p className="font-timesnr text-secondary text-lg">{persona.area || persona.escuela}</p>
                                <ResumedPuestos puestos={persona.puesto_programas} />
                                <div className="mt-5">
                                    {
                                        persona.email && <span className="flex items-center font-light text-sm">
                                        <svg className="mr-1.5" id="Layer_1" enableBackground="new 0 0 512 512" width="15" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m443.6 62h-375.2c-37.7 0-68.4 30.7-68.4 68.4v251.1c0 37.8 30.7 68.5 68.4 68.5h375.1c37.7 0 68.4-30.7 68.4-68.4v-251.2c.1-37.7-30.6-68.4-68.3-68.4zm0 32c5.7 0 11 1.3 15.8 3.6l-203.4 203.4-203.4-203.4c4.8-2.3 10.1-3.6 15.8-3.6zm36.4 287.6c0 20.1-16.3 36.4-36.4 36.4h-375.2c-20.1 0-36.4-16.3-36.4-36.4v-251.2c0-2.5.3-5 .8-7.4l211.9 211.9c3 3 7.1 4.7 11.3 4.7s8.3-1.7 11.3-4.7l211.9-211.9c.5 2.4.8 4.9.8 7.4z"/></svg>
                                        {persona.email}
                                        </span>
                                    }
                                    {
                                        persona.extension &&<span className="flex items-center font-light text-sm">
                                        <svg className="mr-1.5" id="Layer_1" width="15" enableBackground="new 0 0 64 64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m11.16 59.25h-6.99c-1.28 0-2.32-1.04-2.32-2.32v-49.07c0-1.28 1.04-2.32 2.32-2.32h6.99c1.28 0 2.32 1.04 2.32 2.32s-1.04 2.32-2.32 2.32h-4.67v44.43h4.67c1.28 0 2.32 1.04 2.32 2.32s-1.04 2.32-2.32 2.32z"/></g><g><path d="m59.83 59.25h-31.46c-1.28 0-2.32-1.04-2.32-2.32s1.04-2.32 2.32-2.32h29.14v-44.43h-29.14c-1.28 0-2.32-1.04-2.32-2.32s1.04-2.32 2.32-2.32h31.46c1.28 0 2.32 1.04 2.32 2.32v49.07c0 1.28-1.04 2.32-2.32 2.32z"/></g><g><path d="m25.76 64h-12c-2.72 0-4.93-2.21-4.93-4.93v-54.14c.01-2.72 2.22-4.93 4.94-4.93h12c2.72 0 4.93 2.21 4.93 4.93v54.14c-.01 2.72-2.22 4.93-4.94 4.93zm-11.99-59.36c-.16 0-.29.13-.29.29v54.14c0 .16.13.29.29.29h12c.16 0 .29-.13.29-.29v-54.14c0-.16-.13-.29-.29-.29z"/></g><g><path d="m53.23 20.42h-18.25c-1.28 0-2.32-1.04-2.32-2.32s1.04-2.32 2.32-2.32h18.25c1.28 0 2.32 1.04 2.32 2.32s-1.04 2.32-2.32 2.32z"/></g><g><g><g><path d="m39.81 33.92h-4.3c-1.28 0-2.32-1.04-2.32-2.32s1.04-2.32 2.32-2.32h4.3c1.28 0 2.32 1.04 2.32 2.32s-1.04 2.32-2.32 2.32z"/></g><g><path d="m52.7 33.92h-4.3c-1.28 0-2.32-1.04-2.32-2.32s1.04-2.32 2.32-2.32h4.3c1.28 0 2.32 1.04 2.32 2.32s-1.04 2.32-2.32 2.32z"/></g></g><g><g><path d="m39.81 42.18h-4.3c-1.28 0-2.32-1.04-2.32-2.32s1.04-2.32 2.32-2.32h4.3c1.28 0 2.32 1.04 2.32 2.32 0 1.29-1.04 2.32-2.32 2.32z"/></g><g><path d="m52.7 42.18h-4.3c-1.28 0-2.32-1.04-2.32-2.32s1.04-2.32 2.32-2.32h4.3c1.28 0 2.32 1.04 2.32 2.32 0 1.29-1.04 2.32-2.32 2.32z"/></g></g><g><g><path d="m39.81 50.45h-4.3c-1.28 0-2.32-1.04-2.32-2.32s1.04-2.32 2.32-2.32h4.3c1.28 0 2.32 1.04 2.32 2.32s-1.04 2.32-2.32 2.32z"/></g><g><path d="m52.7 50.45h-4.3c-1.28 0-2.32-1.04-2.32-2.32s1.04-2.32 2.32-2.32h4.3c1.28 0 2.32 1.04 2.32 2.32s-1.04 2.32-2.32 2.32z"/></g></g></g></g></svg>
                                        Ext. {persona.extension}
                                        </span>
                                    }
                                    {
                                       persona.telefono && <span className="flex items-center justify-start font-light text-sm">
                                       <svg id="Layer_1" height="15" className="mr-1.5" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><path d="m437.018 74.98c-48.353-48.352-112.64-74.98-181.02-74.98-.004 0 .002 0-.002 0-68.374 0-132.666 26.631-181.016 74.98-48.351 48.352-74.98 112.639-74.98 181.02.002 43.529 11.08 86.312 32.092 124.152l-31.538 112.808c-1.458 5.217.01 10.815 3.84 14.645s9.426 5.297 14.646 3.84l112.811-31.539c37.836 21.015 80.617 32.093 124.148 32.094 68.381 0 132.668-26.629 181.021-74.981s74.98-112.64 74.98-181.02c-.002-68.381-26.632-132.667-74.982-181.019zm-181.02 407.02c-40.346-.001-79.949-10.773-114.531-31.151-2.329-1.373-4.961-2.077-7.615-2.077-1.354 0-2.712.183-4.039.554l-93.194 26.054 26.054-93.191c1.099-3.93.549-8.137-1.522-11.653-20.378-34.587-31.149-74.193-31.151-114.537 0-60.367 23.508-117.12 66.194-159.806s99.439-66.193 159.804-66.193c124.614 0 225.998 101.383 226.002 225.999 0 124.617-101.384 226.001-226.002 226.001z"/><path d="m366.507 275.182c-9.169-9.17-21.396-14.22-34.428-14.22s-25.258 5.05-34.425 14.219l-6.954 6.953c-1.715 1.714-4.02 2.659-6.489 2.659-2.471 0-4.776-.945-6.494-2.663l-47.873-47.872c-1.715-1.714-2.659-4.02-2.66-6.491 0-2.471.943-4.775 2.656-6.488l6.956-6.955c18.983-18.983 18.983-49.871.001-68.854l-13.911-13.915c-9.171-9.167-21.397-14.214-34.428-14.214s-25.257 5.048-34.427 14.218l-10.372 10.374c-21.929 21.929-29.889 54.585-22.416 91.955 7.033 35.164 27.136 70.762 56.607 100.236 37.139 37.135 84.439 59.307 126.53 59.31h.008c26.521 0 49.226-8.684 65.655-25.113l10.373-10.373c18.983-18.983 18.983-49.873 0-68.858zm-7.303 61.553-10.373 10.373c-10.682 10.681-26.048 16.326-44.442 16.326-.001 0-.005 0-.005 0-34.312-.002-73.684-18.889-105.319-50.522-25.33-25.332-42.52-55.486-48.403-84.907-5.443-27.217-.396-50.25 14.212-64.859l10.371-10.373c3.503-3.502 8.195-5.431 13.214-5.431 5.021 0 9.715 1.929 13.216 5.429l13.909 13.912c7.286 7.287 7.286 19.142.001 26.428l-6.956 6.955c-7.381 7.38-11.445 17.22-11.444 27.706.001 10.484 4.067 20.323 11.447 27.702l47.873 47.871c7.382 7.384 17.222 11.45 27.707 11.45 10.483 0 20.321-4.065 27.701-11.445l6.955-6.954c3.502-3.503 8.194-5.432 13.212-5.432 5.019 0 9.711 1.929 13.215 5.433l13.909 13.909c7.286 7.285 7.287 19.142 0 26.429z"/></g></svg>
                                       {persona.telefono}
                                       </span>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                } 
            )}
        </div>
      </Main>
    </div>
  );
}
