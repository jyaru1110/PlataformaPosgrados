import Select from "react-select";
import Creatable from "react-select/creatable";
const InputClase = ({ onchange, options, default_value }) => {
  const value_default = default_value;

  const actualizar = (clase) => {
    clase = clase.label;
    onchange(clase);
  };

  return (
    <div className="w-28">
      {/* <Select
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
        options={options}
        defaultValue={{label: value_default, value: value_default}}
        onChange={actualizar}
      />*/}
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
        options={options}
        defaultValue={{ label: value_default, value: value_default }}
        onChange={actualizar}
        onCreateOption={(input)=>console.log(input)}
      />
    </div>
  );
};

export default InputClase;
