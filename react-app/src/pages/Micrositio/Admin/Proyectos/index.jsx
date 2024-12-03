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
            <CardProyectoEditar proyecto={{nombre: "Resultados de Aprendizaje", descripcion: "Implementación de RAPs y sus evidencias a través de UPlanner y Blackboard", id: "1", foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnBreaB1AG5AuORv9pr8_3AkuBOV2xHw-_aGny-HW9_ZmGuyG8Hp0lpdE2TTqFA9cExTk&usqp=CAU"}} />
        </div>
      </Main>
    </div>
  );
}
