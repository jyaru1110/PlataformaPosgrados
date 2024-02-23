import Select from "react-select";
export default function MultiselectPrograma({ onChange }) {
  const options = [
    { value: 1, label: "Educación Continua" },
    { value: 2, label: "Gobierno y Economía" },
    { value: 3, label: "Bellas Artes" },
    { value: 5, label: "Derecho" },
    { value: 6, label: "Empresariales" },
    { value: 7, label: "ESDAI" },
    { value: 8, label: "Filosofía" },
    { value: 9, label: "Ingeniería" },
    { value: 10, label: "Comunicación" },
    { value: 11, label: "Pedagogía" },
    { value: 12, label: "Empresariales Santa Fe" },
  ];
  return (
    <span className="mt-2 ">
      <label className="ml-1 font-poppins text-sm font-thin">
        Selecciona un programa o programas
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
