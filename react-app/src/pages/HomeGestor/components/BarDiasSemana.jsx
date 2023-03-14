import { getDiasSemana } from "../../../utils/get_dias_semana";
import { date_to_day_dd_mm } from "../../../utils/date_to_string";
import { useEffect,useState } from "react";
import { get_fetch } from "../../../hooks/get_fetch";
import Servicio from "./Servicio";

export default function BarDiasSemana() {
    const dias = getDiasSemana();
    const [dia, setDia] = useState(dias[0]);
    const [servicios, setServicios] = useState({servicio:['Cargando']});
    useEffect(() => {
        let url = `http://localhost:3900/api/servicios_por_fecha?fecha=${dia.toISOString().substring(0,10)}`;
        get_fetch(url, setServicios);
    }, [dia]);
    return (
      <>
        <h1 className = "font-poppins text-lg font-semibold text-primary ml-1 mt-2">{date_to_day_dd_mm(dia)}</h1>
        <div className="flex flex-row justify-between">
        {dias.map((dia_m) => (
            <div key = {dia_m}>
                <p className = "font-poppins text-xs text-slate-500 text-center font-extralight">{date_to_day_dd_mm(dia_m).substring(0,1)}</p>
                {date_to_day_dd_mm(dia_m)===date_to_day_dd_mm(dia) ? 
                    (<button className = "w-8 h-8 text-center bg-primary rounded-full font-semibold text-base text-white" onClick={()=>setDia(dia_m)}>{dia_m.getDate()}</button>):
                    (<button className = "w-8 h-8 text-center  rounded-full font-semibold text-base" onClick={()=>setDia(dia_m)}>{dia_m.getDate()}</button>)
                }
            </div>
        ))}
        </div>
        {servicios.servicio[0]=='Cargando' ? <div className="m-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] m-2"></div> :
        <>
        {servicios.servicio.length==0 ? <h1 className="text-center mt-2">No hay servicios para esta fecha</h1> : 
        <>
            {servicios.servicio.map((servicio) => (
                <div key = {servicio.id}>
                    <Servicio servicio_parm = {servicio}/>
                </div>
            ))}
        </>
        }
        </>
        }
      </>
    );
  }