import DropdownEscuelas from '../../components/form/DropdownEscuelas';
import DropdownDia from '../../components/form/DropdownDia';
import { useState, useEffect } from 'react';

export default function FiltrarHorario() {
    const [escuela, setEscuela] = useState('');
    const [dia, setDia] = useState('');


    return (
      <div className="w-11/12 p-0">
        <DropdownEscuelas func = {setEscuela}/>
        <DropdownDia func = {setDia}/>
      </div>
    );
  }