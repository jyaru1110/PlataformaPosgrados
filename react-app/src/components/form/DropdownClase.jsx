import Dropdown from "./Dropdown";
import { useClases } from "../../hooks/useClases";
import {clases_to_correct_format} from "../../utils/clases_to_correct_format";

export default function DropdowClase(props) {
  const label = 'Selecciona una número de clase';
  const clases = useClases();
  const options = clases_to_correct_format(clases);

 
  const child_to_parent = (child_data) => {
    props.func(child_data);
  };

  return (
    <Dropdown label = {label} options = {options} child_to_parent = {child_to_parent}>
    </Dropdown >
  );
}