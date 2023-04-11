import Header from "../../components/Header"
import DropdownProgramas from "../../components/form/DropdownProgramas"
import DropdowClase from "../../components/form/DropdownClase"
import Horas from "../../components/form/Horas"
import Fecha from "../../components/form/Fecha"
import DropdownDia from "../../components/form/DropdownDia"
import DropdowSalon from "../../components/form/DropdownSalon"
import NumeroServicios from "../../components/form/NumeroServicios"
import {useServicio} from "../../hooks/useServicio"
import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

export default function Servicio() {
    const navigation = useNavigate();
    const {state} = useLocation(); 
    const {id} = state;
    const resultado = useServicio(id);
    const servicio = resultado.servicio;
    const loading = resultado.loading;

    const [fecha, setFecha] = useState('');
    const [dia, setDia] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [salon, setSalon] = useState('');
    const [clase, setClase] = useState('');
    const [programa, setPrograma] = useState('');
    const [numeroServicios, setNumeroServicios] = useState(0);

    const actualizar_informacion = () => {
        console.log("actualizar");
    }

    const eliminar_servicio = () => {
        console.log("eliminar");
    }

    useEffect(() => {
        console.log("numero: ", numeroServicios);
    }, [numeroServicios])

    return (
        <>
        {
            loading ? <div className="m-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>:
                <div className="mt-2">
                <div className="ml-9">
                    <Header titulo="Editar o eliminar servicios"></Header>
                </div>
                <div className="flex justify-between w-80 m-auto font-poppins text-sm mt-4">
                    <button className="text-gray1 ml-1" onClick={()=>{navigation(-1)}}>Cancelar</button>
                    <button className="font-semibold text-primary" onClick={actualizar_informacion}>Guardar</button>
                </div>
                <div className="m-auto w-80 mt-4 ">
                    <DropdownProgramas escuela = 'Todos' func = {setPrograma} value = {servicio.programa}/>
                    <DropdowClase func = {setClase} value = {servicio.no_clase}/>
                    <Fecha setFecha = {setFecha} value = {servicio.fecha}/>
                    <Horas setHoraFin = {setHoraFin} setHoraInicio = {setHoraInicio} value_inicio = {servicio.hora_inicio} value_fin = {servicio.hora_fin}/>
                    <DropdownDia func = {setDia} value = {servicio.dia}/>
                    <div className="flex justify-between">
                        <DropdowSalon func = {setSalon} value = {servicio.salon_id}/>
                        <NumeroServicios setNumeroServicios = {setNumeroServicios} value = {servicio.num_servicios}/>
                    </div>
                    <button className="font-poppins text-sm rounded-md mb-2 text-deletetext w-80 font-medium h-7 bg-deletebg" onClick={eliminar_servicio}>Eliminar horario</button>
                </div>
            </div>
        }
        </>
        
    )
}