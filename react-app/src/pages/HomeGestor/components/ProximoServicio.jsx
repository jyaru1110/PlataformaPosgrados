import image_coffe from "../../../assets/CoffeeGlass.png";
import { useProximoServicio } from "../../../hooks/useProximoServicio";
export default function ProximoServicio() {
    const servicio = useProximoServicio();
    return (
      <div className="sm:w-2/5">
        <h1 className = "font-poppins text-lg font-semibold text-primary ml-1 mt-2">Próximo servicio</h1>
        <div className = "bg-primary m-auto text-white rounded-2xl p-4 flex flex-row items-center justify-between sm:my-0 sm:ml-1 sm:mr-0 sm:w-full">
            {servicio==undefined ? 
            <div className="m-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div> : 
            (
                <div className="flex flex-col items-stretch h-full">
                    <h1 className = "font-poppins text-base font-semibold">{servicio.salon_id}</h1>
                    <h1 className = "font-poppins text-base font-semibold">{servicio.hora_inicio.substring(0,5)} - {servicio.hora_fin.substring(0,5)}</h1>
                    <h1 className = "font-poppins text-base font-semibold">{servicio.fecha}</h1>
                    {servicio.num_servicios>0 ?
                        <h1 className = "font-poppins text-base font-semibold">{servicio.num_servicios} servicios</h1>:
                        <h1 className = "font-poppins text-base font-semibold">Sin servicios</h1>
                    }
                </div>
            )
            }
            <img src={image_coffe}></img>
            
        </div>
      </div>
    );
  }