import Header from "../../components/Header"
import DropdownEscuelas from "../../components/form/DropdownEscuelas"
import DropdowClase from "../../components/form/DropdownClase"
import Horas from "../../components/form/Horas"
import Fechas from "../../components/form/Fechas"
import DropdownDia from "../../components/form/DropdownDia"
import DropdowSalon from "../../components/form/DropdownSalon"
import NumeroServicios from "../../components/form/NumeroServicios"
import { useState,useEffect } from "react"
import { useHorario } from "../../hooks/useHorario"
import { useNavigate, useLocation } from "react-router-dom"
import { put_fetch } from "../../hooks/put_fetch"
import { delete_fetch } from "../../hooks/delete_fetch"

export default function Horario() {
    const {state} = useLocation();
    const navigation = useNavigate();
    const {id_horario} = state;
    const resultado = useHorario(id_horario);
    const horario = resultado.horario;
    const loading = resultado.loading;

    const [escuela, setEscuela] = useState('');
    const [dia, setDia] = useState('');
    const [clase, setClase] = useState('');
    const [hora_inicio, setHoraInicio] = useState('');
    const [hora_fin, setHoraFin] = useState('');
    const [fecha_inicio, setFechaInicio] = useState('');
    const [fecha_fin, setFechaFin] = useState('');
    const [salones, setSalones] = useState('');

    useEffect(() => {
        if(horario){
            if(escuela===''){
                setEscuela(horario[0].escuela);
            }
            if(dia===''){
                setDia(horario[0].dia);
            }
            if(clase===''){
                setClase(horario[0].no_clase);
            }
            if(hora_inicio===''){
                setHoraInicio(horario[0].hora_inicio);
            }
            if(hora_fin===''){
                setHoraFin(horario[0].hora_fin);
            }
            if(fecha_inicio===''){
                setFechaInicio(horario[0].fecha_inicio);
            }
            if(fecha_fin===''){
                setFechaFin(horario[0].fecha_fin);
            }
            if(salones===''){
                setSalones(horario[0].salon);
            }
        }
        
    }, [escuela, dia, clase, hora_inicio, hora_fin, fecha_inicio, fecha_fin, salones]);

    const after_set = (data) => {
        if(data.horario[0])
        {
            alert('Horario actualizado');
            window.location.reload();
        }
        else
            alert('No se pudo actualizar el horario');
    }

    const actualizar_informacion = () => {
        if(escuela==='Todos' || dia==='Todos' && clase==='Todos' && hora_inicio==='Todos' && hora_fin==='Todos' && fecha_inicio==='Todos' && fecha_fin==='Todos' && salones==='Todos'){
            alert('No se puede actualizar con campos en "Todos"');
            return;
        }
        
        if((escuela==='' || escuela == horario[0].escuela) && (dia==='' || dia == horario[0].dia) && (clase===''||clase ==  horario[0].no_clase) && (hora_inicio==='' || hora_inicio == horario[0].hora_inicio) && (hora_fin==='' || hora_fin==horario[0].hora_fin) && (fecha_inicio===''  || fecha_inicio == horario[0].fecha_inicio) && (fecha_fin==='' || fecha_fin==horario[0].fecha_fin) && (salones===''||salones==horario[0].salon))
            return;

        const data = {
            escuela: escuela,
            dia: dia,
            no_clase: clase,
            hora_inicio: hora_inicio,
            hora_fin: hora_fin,
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            salon: salones
        }

        const controller = new AbortController();
        const signal = controller.signal;
        const url = `http://localhost:3900/api/update_horario/${id_horario}/`;
        put_fetch(url,signal,data,after_set);
        return () => controller.abort();
    }

    const after_delete = (data) => {
        if(data.horario)
        {

            alert('Horario eliminado');
            navigation(-1);
        }
        else
            alert('No se pudo eliminar el horario');
    }

    const eliminar_horario = () => {
        const controller = new AbortController();
        const signal = controller.signal;
        const url = `http://localhost:3900/api/delete_horario/${id_horario}/`;
        delete_fetch(url,signal,after_delete);
        return () => controller.abort();
    }

    return (
        <>
        {
            loading ? <div className="m-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>:
                <div className="mt-2">
                <div className="ml-9">
                    <Header titulo="Editar o eliminar horarios"></Header>
                </div>
                <div className="flex justify-between w-80 m-auto font-poppins text-sm mt-4">
                    <button className="text-gray1 ml-1" onClick={()=>{navigation(-1)}}>Cancelar</button>
                    <button className="font-semibold text-primary" onClick={actualizar_informacion}>Guardar</button>
                </div>
                <div className="m-auto w-80 mt-4 ">
                    <DropdownEscuelas func = {setEscuela} value = {horario[0].escuela}/>
                    <DropdowClase func = {setClase} value ={horario[0].no_clase}/>
                    <Fechas setFechaFin = {setFechaFin} setFechaInicio = {setFechaInicio} value_inicio = {horario[0].fecha_inicio} value_fin = {horario[0].fecha_fin}/>
                    <Horas setHoraFin = {setHoraFin} setHoraInicio = {setHoraInicio} value_inicio = {horario[0].hora_inicio} value_fin = {horario[0].hora_fin}/>
                    <DropdownDia func = {setDia} value ={horario[0].dia}/>
                    <DropdowSalon func = {setSalones} value ={horario[0].salon}/>
                    <button className="font-poppins text-sm rounded-md mb-2 text-deletetext w-80 font-medium h-7 bg-deletebg" onClick={eliminar_horario}>Eliminar horario</button>
                </div>
            </div>
        }
        </>
        
    )
}