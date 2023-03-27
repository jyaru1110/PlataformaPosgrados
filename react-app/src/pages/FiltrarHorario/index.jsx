import DropdownEscuelas from '../../components/form/DropdownEscuelas';
import DropdownDia from '../../components/form/DropdownDia';
import DropdowClase from '../../components/form/DropdownClase';
import { useState, useEffect } from 'react';

export default function FiltrarHorario() {
    const [escuela, setEscuela] = useState('');
    const [dia, setDia] = useState('');
    const [clase, setClase] = useState('');

    useEffect(() => {
      console.log(escuela);
      console.log(dia);
      console.log(clase);
    }, [escuela, dia, clase]);


    return (
      <div className="w-11/12 p-0">
        <DropdownEscuelas func = {setEscuela}/>
        <DropdownDia func = {setDia}/>
        <DropdowClase func = {setClase}/>
      </div>
    );
  }