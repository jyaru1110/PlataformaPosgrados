import { useClases } from "../../hooks/useClases";
import { clases_to_correct_format } from "../../utils/clases_to_correct_format";
import Select from "react-select";

export default function DropdowClase(props) {
  const label = "Selecciona un número de clase";
  const clases = useClases();
  const value = props.value || "Todos";
  const options = clases_to_correct_format(clases);

  const child_to_parent = (child_data) => {
    child_data = child_data.label;
    props.func(child_data);
  };

  return (
    <>
      <label className="font-poppins text-sm ml-1 mb-2 font-thin">
        {label}
      </label>
      <Select
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            border:"none",
            backgroundColor: "rgb(242 245 249)",
            borderRadius: "0.375rem",
            height: "1.75rem",
            minHeight: "1.75rem",
            fontFamily:'Poppins',
            fontSize: '14px',
            marginBottom: '1rem',
            outline: 'none',
          }),
        }}
        options={options}
        onChange={child_to_parent}
        defaultValue={{ value: 0, label: value }}
      />
    </>
  );
}
