import { usePrograma } from "../../../hooks/usePrograma";
import { programas_to_correct_format } from "../../../utils/programas_to_correct_format";

export default function SelectPrograma({onchange}) {
  const programas = usePrograma("Todos");
  const options = programas_to_correct_format(programas);

  const child_to_parent = (e) => {
    onchange(e.target.value);
  };

  return (
    <select  placeholder="Escoge programa" onChange={child_to_parent} className="w-auto">
        {
            options?.map((programa)=>{
                return <option key={programa._id} value={programa.name} className="w-auto">{programa.name}</option>
            }
            ) 
        }
    </select>
  );
}