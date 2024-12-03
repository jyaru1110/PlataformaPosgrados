import Header from "../components/Header";
import Main from "../../components/Main";
import { Link } from "react-router-dom";
import { useProyectos } from "../../../../hooks/useProyectos";
import CardProyectoEditar from "./Components/CardProyectoEditar";
export default function ProyectosAdmin() {
  const { loading, proyectos } = useProyectos();
  return (
    <div className="w-5/6 flex flex-col relative h-screen">
      <Header title="Proyectos">
        <Link
          to="/micrositio/admin/proyectos/new"
          className="bg-primary text-center flex items-center text-white rounded-lg px-3 py-2"
        >
          Nuevo
        </Link>
      </Header>
      <Main>
        <div className="grid grid-cols-2 mt-8 gap-4">
            {
                proyectos.map((proyecto)=>{
                    return <CardProyectoEditar proyecto={proyecto}></CardProyectoEditar>
                })
            }
        </div>
      </Main>
    </div>
  );
}
