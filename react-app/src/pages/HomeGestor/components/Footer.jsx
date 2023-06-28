import BotonFooter from "./BotonFooter"
import ButtonAdd from "./ButtonAdd"
export default function Footer() {
  return (
        <div className="fixed bottom-0 left-0 flex flex-col items-center w-full md:w-1/3 md:pr-16 md:top-1/4 lg:pr-20">
            <ButtonAdd ruta = "/add-servicio"/>
            <div className="w-full p-4 overflow-x-auto flex md:flex-col md:items-center sm:justify-between">
                <BotonFooter texto = {"Busca horarios en especifico"} ruta='/filtrar-horario'/>
                <BotonFooter texto = {"Consulta información de los coffes"} />
                <BotonFooter texto = {"Filtra servicios por isla"} ruta = '/filtrar-islas'/>
                <BotonFooter texto = {"Busca servicios en especifico"} ruta = '/filtrar-servicios'/>
                <BotonFooter texto = {"Solicitudes de servicios"} ruta = '/solicitudes'/>
            </div>
        </div>
    )
}