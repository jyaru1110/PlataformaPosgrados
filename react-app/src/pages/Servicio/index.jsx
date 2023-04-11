import Header from "../../components/Header"
import DropdownProgramas from "../../components/form/DropdownProgramas"
import DropdowClase from "../../components/form/DropdownClase"
import Horas from "../../components/form/Horas"
import Fechas from "../../components/form/Fechas"
import DropdownDia from "../../components/form/DropdownDia"
import DropdowSalon from "../../components/form/DropdownSalon"
import { useNavigate } from "react-router-dom"

export default function Servicio() {
    const loading = false;
    const navigation = useNavigate();

    const actualizar_informacion = () => {
        console.log("actualizar");
    }

    const eliminar_servicio = () => {
        console.log("eliminar");
    }

    return (
        <>
        {
            loading ? <div className="m-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>:
                <div className="mt-2">
                <div className="ml-9">
                    <Header titulo="Editar o eliminar servicios"></Header>
                </div>
                <div className="flex justify-between w-80 m-auto font-poppins text-sm mt-4">
                    <button className="text-gray1 ml-1" onClick={()=>{navigation(-1)}}>Cancelar</button>
                    <button className="font-semibold text-primary" onClick={actualizar_informacion}>Guardar</button>
                </div>
                <div className="m-auto w-80 mt-4 ">
                    <DropdownProgramas escuela = 'Todos'/>
                    <DropdowClase />
                    <Fechas />
                    <Horas/>
                    <DropdownDia/>
                    <DropdowSalon/>
                    <button className="font-poppins text-sm rounded-md mb-2 text-deletetext w-80 font-medium h-7 bg-deletebg" onClick={eliminar_servicio}>Eliminar horario</button>
                </div>
            </div>
        }
        </>
        
    )
}