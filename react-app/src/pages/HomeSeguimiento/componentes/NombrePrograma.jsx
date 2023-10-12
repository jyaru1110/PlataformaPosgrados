export default function NombrePrograma(props) {
    const { register,nombre } = props;
    return (
        <input placeholder="Escribe el nombre del programa" className="w-full font-seravek text-base h-10 bg-headerbg text-textform rounded-xl px-2.5 mb-2" {...register(nombre)}/>
    ) 
}