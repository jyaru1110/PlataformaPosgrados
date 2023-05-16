import Select from "react-select";
const InputClase = () => {
  const options = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
  ];

  return (
    <div className="input-group mb-3">
      <Select
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            border: "none",
            height: "1.75rem",
            minHeight: "1.75rem",
            fontFamily: "Poppins",
            fontSize: "16px",
            marginBottom: "1rem",
          }),
        }}
        options={options}
      />
    </div>
  );
};

export default InputClase;
