import DropdownEscuelas from '../../components/form/DropdownEscuelas';
import DropdownDia from '../../components/form/DropdownDia';
import DropdowClase from '../../components/form/DropdownClase';
import Horas from '../../components/form/Horas';
import Fechas from '../../components/form/Fechas';
import DropdownSalon from '../../components/form/DropdownSalon';
import { useHorarios } from '../../hooks/useHorarios';
import { date_to_dd_monthshort_yyyy } from '../../utils/date_to_string';
import { useState } from 'react';
import ButtonAdd from '../HomeGestor/components/ButtonAdd';

export default function FiltrarHorario() {
    const [escuela, setEscuela] = useState('Todos');
    const [dia, setDia] = useState('Todos');
    const [clase, setClase] = useState('Todos');
    const [hora_inicio, setHoraInicio] = useState('Todos');
    const [hora_fin, setHoraFin] = useState('Todos');
    const [fecha_inicio, setFechaInicio] = useState('Todos');
    const [fecha_fin, setFechaFin] = useState('Todos');
    const [salones, setSalones] = useState('Todos');

    const resultado = useHorarios();
    const horarios =  resultado.horarios;
    const loading = resultado.loading;
    
    const filtrar = (horario) => {
        if(escuela!=='Todos' && horario.escuela!==escuela){
            return false;
        }
        if(dia!=='Todos' && horario.dia!==dia){
            return false;
        }
        if(clase!=='Todos' && horario.no_clase!==clase){

            return false;
        }
        if(hora_inicio!=='Todos' && horario.hora_inicio.substring(0,5)!==hora_inicio){
            return false;
        }
        if(hora_fin!=='Todos' && horario.hora_fin.substring(0,5)!==hora_fin){

            return false;
        }
        if(fecha_inicio!=='Todos' && horario.fecha_inicio!==fecha_inicio){
            return false;
        }
        if(fecha_fin!=='Todos' && horario.fecha_fin!==fecha_fin){
            return false;
        }
        if(salones!=='Todos' && horario.salon!==salones){
            return false;
        }
        return true;
    };


    return (
      <div className="w-11/12 pt-2 sm:flex">
        <div className='md:fixed'>
          <DropdownEscuelas func = {setEscuela}/>
          <DropdowClase func = {setClase}/>
          <DropdownSalon func = {setSalones}/>
          <DropdownDia func = {setDia}/>
          <Horas setHoraFin = {setHoraFin} setHoraInicio = {setHoraInicio}/>
          <Fechas setFechaFin = {setFechaFin} setFechaInicio = {setFechaInicio}/>
        </div>
        {loading ? <div className="m-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div> :
          <div className="flex flex-wrap md:ml-96 w-full">
            {
              horarios.filter(filtrar).map((horario) => (
                <div key = {horario.id_horario} className="rounded-3xl bg-primarylight w-80 ml-9 mb-4 p-2.5 md:w-60 md:ml-2">
                  <div>
                    <p className="text-sm font-poppins text-primary font-semibold mb-2">Clase {horario.no_clase}</p>
                  </div>
                  <p className="font-poppins text-gray1 text-sm mb-1">{horario.salon} • {horario.dia}, {horario.hora_inicio.substring(0,5)} a {horario.hora_fin.substring(0,5)}</p>
                  <p className="font-poppins text-gray1 text-sm mb-1">{ date_to_dd_monthshort_yyyy(horario.fecha_inicio)} - { date_to_dd_monthshort_yyyy(horario.fecha_fin)}</p>
                  <p className='font-poppins text-gray1 text-sm mb-1'>{horario.escuela}</p>
                </div>
              ))
            }
          </div>
        }
        <div className='fixed right-14 bottom-14'>
          <ButtonAdd/>
        </div>
      </div>
    );
  }