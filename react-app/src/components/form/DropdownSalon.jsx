import Dropdown from "./Dropdown";
import { useSalones } from "../../hooks/useSalones";
import {salones_to_correct_format} from "../../utils/salones_to_correct_format";

export default function DropdowSalon(props) {
  const label = 'Selecciona salón';
  const salones = useSalones();
  let options = salones_to_correct_format(salones);
  const value = props.value||'Todos';
  const disabled = props.disabled||false;
 
  const child_to_parent = (child_data) => {
    props.func(child_data);
  };

  return (
    <Dropdown label = {label} options = {options} child_to_parent = {child_to_parent} value = {value} disabled={disabled}>
    </Dropdown >
  );
}