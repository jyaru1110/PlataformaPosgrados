import Fechas from '../../components/form/Fechas';
import SumaIslas from './components/SumaIslas';
import { useSumasIslas } from '../../hooks/useSumasIslas';
import { useState } from 'react';

export default function FiltrarIslas() {
    const [fecha_inicio, setFechaInicio] = useState('2021-01-01');
    const [fecha_fin, setFechaFin] = useState('2024-01-01');
    const res = useSumasIslas(fecha_inicio, fecha_fin);
    const loading = res.loading;
    const sumas = res.sumasIslas;

    return (
        <div className="w-11/12 flex flex-col pt-2">
            <div className=''>
                <Fechas setFechaFin = {setFechaFin} setFechaInicio = {setFechaInicio}/>
            </div>
            <SumaIslas sumas = {sumas} loading={loading}/>
        </div>
    )
}
