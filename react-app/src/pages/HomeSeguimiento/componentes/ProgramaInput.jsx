import { usePrograma } from "../../../hooks/usePrograma";
export default function ProgramaInput(props) {
  const programas = usePrograma("Todos");
  const { register } = props;
  const onChange = (e) => {
    props.setPrograma(e.target.value);
  }

  return (
    <select className="w-full font-seravek text-base h-10 bg-headerbg text-textform rounded-xl px-2.5 mb-4" onChange={onChange} {...register("programa")}>
      <option value="choose">Selecciona un programa</option>
      {programas?.map((programa) => {
        return (
          <option key={programa._id} value={programa.name}>
            {programa.name}
          </option>
        );
      })}
    </select>
  );
}
