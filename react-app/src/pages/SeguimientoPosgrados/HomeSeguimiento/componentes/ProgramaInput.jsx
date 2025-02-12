import { useProgramasShort } from "../../../../hooks/useProgramas";
export default function ProgramaInput(props) {
  const {programas} = useProgramasShort();
  const { register,nombre } = props;

  return (
    <select className="w-full font-seravek text-base h-10 bg-headerbg text-textform rounded-xl px-2.5 mb-2" {...register(nombre)}>
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
