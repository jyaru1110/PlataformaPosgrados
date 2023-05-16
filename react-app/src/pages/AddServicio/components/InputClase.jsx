import Select from "react-select";
const InputClase = ({onchange,options}) => {
  

  const actualizar = (clase) => {
    clase = clase.label;
    onchange(clase);
  };

  return (
    <div className="w-28">
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
            backgroundColor: "transparent",
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
