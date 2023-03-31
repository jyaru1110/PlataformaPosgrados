import Fechas from '../../components/form/Fechas';
import SumaIslas from './components/SumaIslas';
import SumaDia from './components/SumaDia';
import { datetype_to_yyyy_mm_dd } from '../../utils/date_to_string';
import { useSumasIslas } from '../../hooks/useSumasIslas';
import { useState } from 'react';

export default function FiltrarIslas() {
    const hoy = new Date();
    const sexto_dia = new Date();
    sexto_dia.setDate(hoy.getDate() + 6);

    const [fecha_inicio, setFechaInicio] = useState(datetype_to_yyyy_mm_dd(hoy));
    const [fecha_fin, setFechaFin] = useState(datetype_to_yyyy_mm_dd(sexto_dia));
    const res = useSumasIslas(fecha_inicio, fecha_fin);
    const loading = res.loading;
    const sumas = res.sumasIslas;

    return (
        <div className="w-11/12 flex flex-col pt-2">
            <div className=''>
                <Fechas setFechaFin = {setFechaFin} setFechaInicio = {setFechaInicio}/>
            </div>
            <SumaIslas sumas = {sumas} loading={loading}/>
            <SumaDia fecha_fin={fecha_fin} fecha_inicio = {fecha_inicio}></SumaDia>
        </div>
    )
}
