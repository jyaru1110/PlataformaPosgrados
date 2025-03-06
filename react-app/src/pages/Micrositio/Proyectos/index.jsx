import { useState } from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Buscador from "../components/Buscador";
import CardProyecto from "./Components/CardProyecto";
import { useProyectos } from "../../../hooks/useProyectos";

export default function Proyectos() {
  const [query, setQuery] = useState("");
  const {loading, proyectos} = useProyectos(query);
  return (
    <div className="w-full min-w-[1117px] flex flex-col relative h-screen">
      <Header></Header>
      <Main>
        <Buscador setQuery={setQuery} />
        <div className="grid grid-cols-2 mt-8 gap-4">
            {
              proyectos.map((proyecto)=>{
                return <CardProyecto key={proyecto.id} proyecto={proyecto}></CardProyecto>
              })
            }
        </div>
      </Main>
    </div>
  );
}
