import Header from "../components/Header";
import Main from "../../components/Main";
import { Link } from "react-router-dom";
import { useProyectos } from "../../../../hooks/useProyectos";
import { useRef, useState } from "react";
import CardProyectoEditar from "./Components/CardProyectoEditar";
export default function ProyectosAdmin() {
  const [query, setQuery] = useState("");
  const { loading, proyectos } = useProyectos(query);
  const searchInputRef = useRef(null);

  const search = () => {
    if(timeOutRef.current === null) {
      timeOutRef.current = setTimeout(()=>{
        setQuery(searchInputRef.current.value)
        timeOutRef.current = null
      },1100);
    }
  }

  return (
    <div className="w-full min-w-[1300px] flex flex-col relative h-screen">
      <Header title="Proyectos">
        <Link
          to="/micrositio/admin/proyectos/new"
          className="bg-primary text-center flex items-center text-white rounded-lg px-3 py-2"
        >
          Nuevo
        </Link>
        <input
          ref = {searchInputRef}
          onChange={search}
          placeholder="Buscar"
          className="rounded-lg px-3 py-2 border border-grayborder"
        ></input>
      </Header>
      <Main>
      <div className="w-full">
      <div className="w-[1216px] m-auto grid grid-cols-2 mt-8 gap-4">
            {
                proyectos.map((proyecto)=>{
                    return <CardProyectoEditar key={proyecto.id} proyecto={proyecto}></CardProyectoEditar>
                })
            }
        </div>
      </div>
      </Main>
    </div>
  );
}
