import Dropdown from "./Dropdown";
import { useSalones } from "../../hooks/useSalones";
import {salones_to_correct_format} from "../../utils/salones_to_correct_format";

export default function DropdowClase(props) {
  const label = 'Selecciona un salón';
  const salones = useSalones();
  let options = salones_to_correct_format(salones);
 
  const child_to_parent = (child_data) => {
    props.func(child_data);
  };

  return (
    <Dropdown label = {label} options = {options} child_to_parent = {child_to_parent}>
    </Dropdown >
  );
}