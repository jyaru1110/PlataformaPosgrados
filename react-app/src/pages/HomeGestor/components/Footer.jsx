import BotonFooter from "./BotonFooter"
import ButtonAdd from "./ButtonAdd"
import Calendar from "../../../assets/Calendar.png"
import Dashboard from "../../../assets/Dashboard.png"
import Location from "../../../assets/Location.png"
import Search from "../../../assets/Search.png"
export default function Footer() {
  return (
        <div className="fixed bottom-0 left-0 flex flex-col items-center w-full md:w-1/3 md:pr-16 md:top-1/4 lg:pr-20">
            <ButtonAdd />
            <div className="w-full p-4 overflow-x-auto flex md:flex-col md:items-center">
                <BotonFooter texto = {"Busca horarios en especifico"} imagen = {Calendar} ruta='/filtrar-horario'/>
                <BotonFooter texto = {"Consulta información de los coffes"} imagen = {Dashboard}/>
                <BotonFooter texto = {"Filtra servicios por isla"} imagen = {Location} ruta = '/filtrar-islas'/>
                <BotonFooter texto = {"Busca servicios en especifico"} imagen = {Search}/>
            </div>
        </div>
    )
}