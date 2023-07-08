import {get_dias_intervalos} from "../../../utils/get_dias_intervalo";
import {date_to_day_dd_mm,get_numero_dia,get_primera_letra} from "../../../utils/date_to_string";
import {useState, useEffect} from "react";
import { useIslasDia } from "../../../hooks/useIslasDia";

export default function SumaDia(props){

    const dias = get_dias_intervalos(props.fecha_inicio, props.fecha_fin);
    const [dia, setDia] = useState(dias[0]);
    const sumas = useIslasDia(dia);
    
    return(
        <div className="ml-9 w-80">
        <h1 className = "font-poppins text-lg font-semibold text-primary mt-3">{date_to_day_dd_mm(dia)}</h1>
        <div className="flex flex-row justify-between w-full overflow-auto">
        {dias.map((dia_m) => (
            <div key = {dia_m} className="flex-none mr-6">
                <p className = "font-poppins text-xs text-slate-500 text-center font-extralight">{get_primera_letra(dia_m)}</p>
                {date_to_day_dd_mm(dia_m)===date_to_day_dd_mm(dia) ? 
                    (<button className = "w-8 h-8 text-center bg-primary rounded-full font-semibold text-base text-white" onClick={()=>setDia(dia_m)}>{get_numero_dia(dia_m)}</button>):
                    (<button className = "w-8 h-8 text-center  rounded-full font-semibold text-base" onClick={()=>setDia(dia_m)}>{get_numero_dia(dia_m)}</button>)
                }
            </div>
        ))}
        </div>
        {sumas.loading ? <div className="m-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div> :
        <div className="mt-4">
            {sumas.sumas.length==0 ? <h1 className="text-center mt-2 font-poppins">No hay servicios para esta fecha</h1> :
            <div>
                {sumas.sumas.map((suma) => (
                    <div key = {suma.id} className="flex flex-col justify-center items-center w-36 h-28 rounded-2xl bg-primarylight m-2">
                        <p className="font-poppins text-xs text-center font-medium text-gray1">{suma.isla.split('/')[0]}</p>
                        <p className="font-poppins text-2xl font-medium">{suma.servicios_totales}</p>
                        <p className="font-poppins text-xs text-center font-thin text-graytextsecondary">servicios</p>
                    </div>
                ))}
            </div>
            }
        </div>
        }
        </div>
    )
}