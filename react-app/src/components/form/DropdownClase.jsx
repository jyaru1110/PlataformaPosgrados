import Dropdown from "./Dropdown";
import { useClases } from "../../hooks/useClases";
import {clases_to_correct_format} from "../../utils/clases_to_correct_format";

export default function DropdowClase(props) {
  //const options = [{ _id: 1, name: 'Ciencias de la Salud' }, { _id: 2, name: 'Gobierno y Economía' }, { _id: 3, name: 'Bellas Artes'}, { _id: 4, name: 'Humanidades'}, { _id: 5, name: 'Derecho'}, { _id: 6, name: 'Empresariales'}, { _id: 7, name: 'ESDAI'}, { _id: 8, name: 'Filosofía'}, { _id: 9, name: 'Ingeniería'}];
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