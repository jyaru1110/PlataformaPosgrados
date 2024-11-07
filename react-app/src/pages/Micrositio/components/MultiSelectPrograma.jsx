import Select from "react-select";
const options = [
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
  { value: "Ciencias de la Salud", label: "Ciencias de la Salud" },
];

export default function MultiselectPrograma({ onChange }) {
  return (
    <span className="">
      <label className="ml-1 text-sm font-thin">
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
