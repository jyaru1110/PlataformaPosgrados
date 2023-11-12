import Dropdown from "./Dropdown";
import { usePrograma } from "../../hooks/usePrograma";

export default function DropdownProgramas(props) {
  const rol = localStorage.getItem('rol');
  const escuela = localStorage.getItem('escuela');
  const options = usePrograma(rol=='Gestor'?props.escuela:escuela);
  const label = 'Selecciona un programa';
  const value = props.value||'';
  const disabled = props.disabled||false;

  const child_to_parent = (child_data) => {
    props.func(child_data);
  };

  return (
    <Dropdown options={options} label={label} child_to_parent = {child_to_parent} value={value} disabled={disabled}/>
  );
}