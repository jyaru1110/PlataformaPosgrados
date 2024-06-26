import Select from "react-select";
export default function MultiselectPrograma({ onChange }) {
  const options = [
    { value: "Educación Continua", label: "Educación Continua" },
    { value: "Gobierno y Economía", label: "Gobierno y Economía" },
    { value: "Bellas Artes", label: "Bellas Artes" },
    { value: "Derecho", label: "Derecho" },
    { value: "Empresariales", label: "Empresariales" },
    { value: "ESDAI", label: "ESDAI" },
    { value: "Filosofía", label: "Filosofía" },
    { value: "Ingeniería", label: "Ingeniería" },
    { value: "Comunicación", label: "Comunicación" },
    { value: "Pedagogía", label: "Pedagogía" },
    { value: "Empresariales Santa Fe", label: "Empresariales Santa Fe" },
  ];
  return (
    <span className="mt-2 ">
      <label className="ml-1 font-poppins text-sm font-thin">
        Selecciona una escuela o escuelas
      </label>
      <Select
        defaultValue={options}
        isMulti
        name="colors"
        options={options}
        onChange={onChange}
        className="basic-multi-select "
        classNamePrefix="select"
      />
    </span>
  );
}
