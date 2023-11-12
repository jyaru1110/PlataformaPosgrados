export default function EscuelaInput(props) {
    const { register, nombre } = props;
    return (
      <select
        className="w-full font-seravek text-base h-10 bg-headerbg text-textform rounded-xl px-2.5 mb-2"
        {...register(nombre)}
      >
        <option value="choose" defaultChecked>
          Selecciona una escuela
        </option>
        <option value="Ciencias de la Salud">Ciencias de la Salud</option>
        <option value="Gobierno y Economía">Gobierno y Economía</option>
        <option value="Bellas Artes">Bellas Artes</option>
        <option value="Humanidades">Humanidades</option>
        <option value="Derecho">Derecho</option>
        <option value="Empresariales">Empresariales</option>
        <option value="ESDAI">ESDAI</option>
        <option value="Filosofía">Filosofía</option>
        <option value="Ingeniería">Ingeniería</option>
        <option value="Comunicación">Comunicación</option>
        <option value="Pedagogía">Pedagogía</option>
      </select>
    );
  }