import { useState } from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Buscador from "../components/Buscador";
import CardProyecto from "./Components/CardProyecto";
import { useProyectos } from "../../../hooks/useProyectos";

export default function Proyectos() {
  const [query, setQuery] = useState("");
  const {loading, proyectos} = useProyectos();
  console.log(proyectos)
  return (
    <div className="w-5/6 flex flex-col relative h-screen">
      <Header></Header>
      <Main>
        <Buscador setQuery={setQuery} />
        <div className="grid grid-cols-2 mt-8">
            <CardProyecto proyecto={{nombre: "Resultados de Aprendizaje", descripcion: "Implementación de RAPs y sus evidencias a través de UPlanner y Blackboard", id: "1", foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnBreaB1AG5AuORv9pr8_3AkuBOV2xHw-_aGny-HW9_ZmGuyG8Hp0lpdE2TTqFA9cExTk&usqp=CAU"}} />
        </div>
      </Main>
    </div>
  );
}
