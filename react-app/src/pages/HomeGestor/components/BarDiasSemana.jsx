import { getDiasSemana } from "../../../utils/get_dias_semana";
import {
  date_to_day_dd_mm,
  get_numero_dia,
  get_primera_letra,
} from "../../../utils/date_to_string";
import { useState } from "react";
import { useServiciosDia } from "../../../hooks/useServiciosDia";
import { useNavigate } from "react-router-dom";
import Servicio from "./Servicio";

const dias = getDiasSemana();

export default function BarDiasSemana() {
  const navigation = useNavigate();
  const [dia, setDia] = useState(dias[0]);
  const resultado = useServiciosDia(dia);
  const servicios = resultado.servicios;
  const loading = resultado.loading;

  return (
    <div className="md:w-full md:mx-8 pt-40 pb-32 md:p-0 mb-10">
      <h1 className="font-poppins text-lg font-semibold text-primary ml-1 md:mt-2 mt-6">
        {date_to_day_dd_mm(dia)}
      </h1>
      <div className="flex flex-row justify-between">
        {dias.map((dia_m) => (
          <div key={dia_m}>
            <p className="font-poppins text-xs text-slate-500 text-center font-extralight">
              {get_primera_letra(dia_m)}
            </p>
            {date_to_day_dd_mm(dia_m) === date_to_day_dd_mm(dia) ? (
              <button
                className="w-8 h-8 text-center bg-primary rounded-full font-semibold text-base text-white"
                onClick={() => setDia(dia_m)}
              >
                {get_numero_dia(dia_m)}
              </button>
            ) : (
              <button
                className="w-8 h-8 text-center  rounded-full font-semibold text-base"
                onClick={() => setDia(dia_m)}
              >
                {get_numero_dia(dia_m)}
              </button>
            )}
          </div>
        ))}
      </div>
      {loading ? (
        <div className="m-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      ) : (
        <div className="overflow-y-auto mt-1">
          {servicios.length == 0 ? (
            <h1 className="text-center mt-2 font-poppins">
              No hay servicios para esta fecha
            </h1>
          ) : (
            <div>
              {servicios.map((servicio) => (
                <div
                  key={servicio.id}
                  onClick={() => {
                    navigation("/servicio", { state: { id: servicio.id } });
                  }}
                >
                  <Servicio servicio_parm={servicio} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
