import DropdowClase from "../../components/form/DropdownClase";
import DropdownSalon from "../../components/form/DropdownSalon";
import DropdownEscuelas from "../../components/form/DropdownEscuelas";
import DropdownProgramas from "../../components/form/DropdownProgramas";
import Fechas from "../../components/form/Fechas";
import Horas from "../../components/form/Horas";
import OpcionesEstado from "../../components/form/OpcionesEstado";
import ButtonAdd from "../HomeGestor/components/ButtonAdd";
import Header from "../../components/Header";
import { useState } from "react";
import { useServicios } from "../../hooks/useServicios";
import { date_to_day_dd_mm_2 } from "../../utils/date_to_string";
import { useNavigate } from "react-router-dom";

export default function FiltarServicios() {
    const navigation = useNavigate();
    const resultado = useServicios();
    const servicios = resultado.servicios;
    const loading = resultado.loading;
    const [escuela, setEscuela] = useState('Todos');
    const [clase, setClase] = useState('Todos');
    const [hora_inicio, setHoraInicio] = useState('Todos');
    const [hora_fin, setHoraFin] = useState('Todos');
    const [fecha_inicio, setFechaInicio] = useState('Todos');
    const [fecha_fin, setFechaFin] = useState('Todos');
    const [salones, setSalones] = useState('Todos');
    const [programa, setPrograma] = useState('Todos');
    const [estados, setEstados] = useState(['Pendiente', 'Cancelado', 'Realizado']);

    const filtrar = (servicio) => {
        if(escuela!=='Todos' && servicio.escuela!==escuela){
            return false;
        }
        if(programa!=='Todos' && servicio.programa!==programa){
            return false;
        }
        if(clase!=='Todos' && servicio.no_clase!==clase){
            return false;
        }
        if(hora_inicio!=='Todos' && servicio.hora_inicio.substring(0,5)<=hora_inicio){
            return false;
        }
        if(hora_fin!=='Todos' && servicio.hora_fin.substring(0,5)>=hora_fin){
            return false;
        }
        if(fecha_inicio!=='Todos' && servicio.fecha<fecha_inicio){
            return false;
        }
        if(fecha_fin!=='Todos' && servicio.fecha>fecha_fin){
            return false;
        }
        if(salones!=='Todos' && servicio.salon!==salones){
            return false;
        }
        if(!estados.includes(servicio.estado)){
            return false;
        }
        return true;
    };

    return (
      <div className="w-11/12 pt-2 sm:flex sm:w-full">
        <div className="mt-2 ml-9 w-80 md:fixed">
            <Header titulo="Buscar servicios"/>
            <DropdownEscuelas func = {setEscuela}/>
            <DropdownProgramas func = {setPrograma} escuela = {escuela}/>
            <DropdowClase func = {setClase} />
            <DropdownSalon func = {setSalones}/>
            <Horas setHoraFin = {setHoraFin} setHoraInicio = {setHoraInicio}/>
            <Fechas setFechaFin = {setFechaFin} setFechaInicio = {setFechaInicio}/>
            <OpcionesEstado estados={estados} setEstados = {setEstados}/>
        </div>
        <div className="mt-4 flex flex-wrap md:ml-96 w-full">
        {
            loading ? <div className="m-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>:
            servicios.servicio.filter(filtrar).map((servicio_i) => (
                <div className="rounded-3xl bg-primarylight w-80 ml-9 mb-4 p-2.5 font-poppins flex justify-between md:ml-2" key={servicio_i.id} onClick={()=>{navigation("/servicio",{state:{id:servicio_i.id}})}}>
                    <div>
                        <p className="text-primary font-semibold text-xs mb-1">Salón {servicio_i.salon_id}</p>
                        <div className="flex">
                            <p className="text-gray1 text-xs mb-1">{servicio_i.hora_inicio.substring(0,5)}-{servicio_i.hora_fin.substring(0,5)} |</p>
                            {
                                servicio_i.estado==='Pendiente' ? <p className="text-yellowtext bg-yellowbg py px-1 rounded-xl w-20 text-center text-xs mb-1 ml-1">{servicio_i.estado}</p> :
                                servicio_i.estado==='Cancelado' ? <p className="text-redtext bg-redbg py px-1 rounded-xl w-20 text-center text-xs mb-1 ml-1">{servicio_i.estado}</p> :
                                <p className="text-greentext bg-greenbg py px-1 rounded-xl w-20 text-center text-xs mb-1 ml-1">{servicio_i.estado}</p>
                            }
                        </div>
                        <p className="text-gray1 text-xs mb-1">{date_to_day_dd_mm_2(servicio_i.fecha)} {servicio_i.fecha.substring(0,4)}</p>
                        <p className="text-gray1 text-xs mb-1">Clase {servicio_i.no_clase}</p>
                        <p className="text-gray1 text-xs mb-1">{servicio_i.programa}</p>
                    </div>
                    <div className="flex justify-center flex-col items-center">
                        <p className="text-primary font-semibold text-xl">{servicio_i.num_servicios}</p>
                        <p className="text-gray1 text-xs">Servicios</p>
                    </div>
                </div>
            ))
        }
        </div>
        <div className='fixed right-14 bottom-14'>
          <ButtonAdd/>
        </div>
      </div>
    );
  }