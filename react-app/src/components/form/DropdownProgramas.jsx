import Dropdown from "./Dropdown";
import { useProgramasOpciones } from "../../hooks/useProgramas";

export default function DropdownProgramas(props) {
  const rol = localStorage.getItem('rol');
  const escuela = localStorage.getItem('escuela');
  const {programas} = useProgramasOpciones(rol=='Gestor'?props.escuela:escuela);
  console.log(programas);
  const label = 'Selecciona un programa';
  const value = props.value||'';
  const disabled = props.disabled||false;

  const child_to_parent = (child_data) => {
    props.func(child_data);
  };

  return (
    <Dropdown options={programas} label={label} child_to_parent = {child_to_parent} value={value} disabled={disabled}/>
  );
}