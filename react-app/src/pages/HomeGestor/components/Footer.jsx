import BotonFooter from "./BotonFooter"
import ButtonAdd from "./ButtonAdd"
import Calendar from "../../../assets/Calendar.png"
import Dashboard from "../../../assets/Dashboard.png"
import Location from "../../../assets/Location.png"
import Search from "../../../assets/Search.png"
export default function Footer() {
  return (
        <div className="fixed bottom-0 left-0 flex flex-col items-center w-full">
            <ButtonAdd />
            <div className="w-full p-4 overflow-x-auto flex md:justify-center">
                <BotonFooter texto = {"Busca horarios en especifico"} action={"Buscar"} imagen = {Calendar}/>
                <BotonFooter texto = {"Consulta información de los coffes"} action={"Dashboard"} imagen = {Dashboard}/>
                <BotonFooter texto = {"Filtra servicios por isla"} action={"Filtrar"} imagen = {Location}/>
                <BotonFooter texto = {"Busca servicios en especifico"} action={"Buscar"} imagen = {Search}/>
            </div>
        </div>
    )
}