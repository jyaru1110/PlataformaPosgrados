import { useClases } from "../../hooks/useClases";
import {clases_to_correct_format} from "../../utils/clases_to_correct_format";
import Select from 'react-select';

export default function DropdowClase(props) {
  const label = 'Selecciona un número de clase';
  const clases = useClases();
  const options = clases_to_correct_format(clases);
  const value = props.value||'Todos';

 
  const child_to_parent = (child_data) => {
    props.func(child_data);
  };

  return (
    <>
        <label className="font-poppins text-sm ml-1 mb-2 font-thin">{label}</label>
        <Select options={options}/>
    </>
  );
}