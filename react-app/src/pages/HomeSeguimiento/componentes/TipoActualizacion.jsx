export default function TipoActualizacion(props) {
    const { register, nombre,onchange} = props;
    return(
        <select className="w-full font-seravek text-base h-10 bg-headerbg text-textform rounded-xl px-2.5 mb-2" {...register(nombre)} onChange={(e)=>onchange(e.target.value)}>
            <option value="choose">Selecciona un tipo de actualización</option>
            <option value="nuevo">Nuevo programa</option>
            <option value="same">Usar el mismo programa</option>
        </select>
    );
}