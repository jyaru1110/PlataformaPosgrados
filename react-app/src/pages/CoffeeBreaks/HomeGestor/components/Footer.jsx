import BotonFooter from "./BotonFooter";
import ButtonAdd from "./ButtonAdd";
import IconBuscarHorario from "../../../../assets/buscar_horarios.svg";
import IconFiltrarIsla from "../../../../assets/filtrar_servicios_isla.svg";
import IconBuscarServicios from "../../../../assets/buscar_servicios.svg";
import IconSolicitudes from "../../../../assets/solicitud_servicios.svg";
import IconServiciosConfirmados from "../../../../assets/servicios_confirmados.svg";
import IconDashboard from "../../../../assets/dashboard.svg";
export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 flex flex-col items-center w-full md:w-1/3 md:pr-16 md:top-1/4 lg:pr-20 z-50">
      <ButtonAdd ruta="/add-servicio" />
      <div className="w-full p-4 overflow-x-auto flex md:flex-col md:items-center sm:justify-between">
        <BotonFooter
          texto={"Busca servicios en especifico"}
          ruta="/filtrar-servicios"
        >
          {IconBuscarServicios}
        </BotonFooter>
        <BotonFooter texto={"Solicitudes de servicios"} ruta="/solicitudes">
          {IconSolicitudes}
        </BotonFooter>
        <BotonFooter texto={"Servicios confirmados"} ruta="/confirmados">
          {IconServiciosConfirmados}
        </BotonFooter>
        <BotonFooter
          texto={"Busca horarios en especifico"}
          ruta="/filtrar-horario"
        >
          {IconBuscarHorario}
        </BotonFooter>
        <BotonFooter texto={"Filtra servicios por isla"} ruta="/filtrar-islas">
          {IconFiltrarIsla}
        </BotonFooter>
        <BotonFooter texto={"Dashboard"} ruta="/dashboard">{IconDashboard}</BotonFooter>
      </div>
    </div>
  );
}
