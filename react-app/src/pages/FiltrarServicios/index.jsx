import DropdowClase from "../../components/form/DropdownClase";
import DropdownSalon from "../../components/form/DropdownSalon";
import DropdownEscuelas from "../../components/form/DropdownEscuelas";
import DropdownProgramas from "../../components/form/DropdownProgramas";
import Fechas from "../../components/form/Fechas";
import Horas from "../../components/form/Horas";
import OpcionesEstado from "../../components/form/OpcionesEstado";
import { useState, useEffect } from "react";

export default function FiltarServicios() {
    const [escuela, setEscuela] = useState('Todos');
    const [clase, setClase] = useState('Todos');
    const [hora_inicio, setHoraInicio] = useState('Todos');
    const [hora_fin, setHoraFin] = useState('Todos');
    const [fecha_inicio, setFechaInicio] = useState('Todos');
    const [fecha_fin, setFechaFin] = useState('Todos');
    const [salones, setSalones] = useState('Todos');
    const [programa, setPrograma] = useState('Todos');
    const [estados, setEstados] = useState(['Pendiente', 'Cancelado', 'Realizado']);


    return (
      <>
        <div className="mt-4">
            <DropdownEscuelas func = {setEscuela}/>
            <DropdowClase func = {setClase} />
            <DropdownSalon func = {setSalones}/>
            <Horas setHoraFin = {setHoraFin} setHoraInicio = {setHoraInicio}/>
            <Fechas setFechaFin = {setFechaFin} setFechaInicio = {setFechaInicio}/>
            <DropdownProgramas func = {setPrograma} escuela = {escuela}/>
            <OpcionesEstado estados={estados} setEstados = {setEstados}/>
        </div>
      </>
    );
  }