import { getDiasSemana } from "../../../utils/get_dias_semana";
import { date_to_day_dd_mm } from "../../../utils/date_to_string";
import { useEffect,useState } from "react";

export default function BarDiasSemana() {
    const dias = getDiasSemana();
    const [dia, setDia] = useState(date_to_day_dd_mm(dias[0]));
    return (
      <>
        <h1 className = "font-poppins text-lg font-semibold text-primary ml-1 mt-2">{dia}</h1>
        {dias.map((dia) => (
            <button className = "bg-primary m-auto text-white rounded-2xl p-4 flex flex-row items-center justify-between" onClick={() => setDia(date_to_day_dd_mm(dia))}/> 
        ))
        }
      </>
    );
  }