import { useProximoServicio } from "../../../hooks/useProximoServicio";
import { get_numero_dia, get_month_short } from "../../../utils/date_to_string";
export default function ProximoServicio() {
    const servicio = useProximoServicio();
    return (
      <div className="sm:w-2/5 mt-4">
        <div className = "m-auto rounded-3xl flex flex-col bg-primary justify-between sm:my-0 sm:ml-1 sm:mr-0 sm:w-full">
          <h1 className = "font-poppins pl-4 pt-4 font-medium text-whiteprimary ml-1 text-lg">Próximo servicio</h1>
        {servicio==undefined ? 
            <div className="m-auto h-8 p-4 mb-4 w-8 animate-spin rounded-full border-4 border-solid border-whitebg border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div> : 
            (
              <div className="w-full pl-4 m-auto flex mb-4">
                <div className="rounded-xl bg-whitebg h-16 flex items-center flex-col justify-center">
                  <p className="text-base text-whiteprimary font-poppins mx-4 z-10 font-medium">{get_numero_dia(servicio.fecha)}</p>
                  <p className="text-xs text-whiteprimary font-poppins mx-4 z-10 font-regular">{get_month_short(servicio.fecha)}</p>
                </div>
                <div className="text-whitebg rounded-xl bg-whitebg h-16 text-sm"></div> 
                <div className="text-whitebg rounded-xl bg-whitebg h-16 text-sm"></div>
              </div>
            )
            }
        </div>
      </div>
    );
  }