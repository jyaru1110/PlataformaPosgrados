import Select from "react-select";
import { useClases } from "../../../hooks/useClases";
import { clases_to_correct_format } from "../../../utils/clases_to_correct_format";
const InputClase = ({onchange}) => {
  const clases = useClases();
  const options = clases_to_correct_format(clases);

  const actualizar = (clase) => {
    clase = clase.label;
    onchange(clase);
  };

  return (
    <div className="">
      <Select
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            border: "none",
            borderRadius: "0.375rem",
            height: "1.75rem",
            minHeight: "1.75rem",
            fontFamily: "Poppins",
            fontSize: "16px",
            marginTop: "1rem",
            width: "100%",
          }),
        }}
        options={options}
        defaultValue={{ value: 0, label: "Clase" }}
        onChange={actualizar}
      />
    </div>
  );
};

export default InputClase;
