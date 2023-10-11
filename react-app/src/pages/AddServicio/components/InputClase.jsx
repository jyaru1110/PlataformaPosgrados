import Creatable from "react-select/creatable";
import { post_axios } from "../../../hooks/post_axios";
import { useState } from "react";
const url_backend = import.meta.env.VITE_URL_API;

const InputClase = ({
  onchange,
  options,
  default_value,
  setIsAddingClass,
  isAddingClass,
  setClases
}) => {
  const value_default = default_value;

  const [value, setValue] = useState({label:value_default, value:value_default});

  const actualizar = (clase) => {
    onchange(clase.label);
    setValue(clase);
  };

  const create_clase = (clase) => {
    setIsAddingClass(true);
    post_axios(url_backend + "/clases", { no_clase: clase }).then((response) => {
      if (response.status === 200) {
        setIsAddingClass(false);
        setClases([...options, { label: clase, value: clase }]);
        onchange(clase)
        setValue({label:clase, value:clase})
      }
    });
  };

  return (
    <div className="w-28">
      <Creatable
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
            backgroundColor: "transparent",
          }),
        }}
        isDisabled={isAddingClass}
        isLoading={isAddingClass}
        value = {value}
        options={options}
        onChange={actualizar}
        onCreateOption={(input) => {
          setIsAddingClass(true);
          create_clase(input);
        }}
      />
    </div>
  );
};

export default InputClase;
