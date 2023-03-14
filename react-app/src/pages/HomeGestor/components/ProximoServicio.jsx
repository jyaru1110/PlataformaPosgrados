import { useEffect,useState } from "react";
import get_fetch from "../../../hooks/get_fetch";
import image_coffe from "../../../assets/CoffeeGlass.png";
import {date_to_dd_month_yyyy} from  "../../../utils/date_to_string";
export default function ProximoServicio() {
    const [servicio, setServicio] = useState([]);

    const after_fetch = (data) => {
        data[0].fecha = date_to_dd_month_yyyy(data[0].fecha);
        setServicio(data);
    }

    useEffect(() => {
        get_fetch("http://localhost:3900/api/proximo_servicio", after_fetch)
    }, []);

    return (
      <>
        <div className = "bg-primary m-auto text-white rounded-2xl p-4 flex flex-row items-center justify-between">
            {servicio[0]==undefined ? 
            <div className="m-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div> : 
            (
                <div className="flex flex-col items-stretch h-full">
                    <h1 className = "font-poppins text-sm font-semibold">{servicio[0].salon}</h1>
                    <h1 className = "font-poppins text-sm font-semibold">{servicio[0].hora_inicio.substring(0,5)} - {servicio[0].hora_fin.substring(0,5)}</h1>
                    <h1 className = "font-poppins text-sm font-semibold">{servicio[0].programa}</h1>
                    <h1 className = "font-poppins text-sm font-semibold">{servicio[0].fecha}</h1>
                    <h1 className = "font-poppins text-sm font-semibold">{servicio[0].num_servicios} servicios</h1>
                </div>
            )

            }
            <img src={image_coffe}></img>
            
        </div>
      </>
    );
  }