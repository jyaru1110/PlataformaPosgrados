export default function Dropdown(props) {
    const { options, name, label, child_to_parent } = props;

    const handleChange = (e) => {
        child_to_parent(options[e.target.value-1].name);
    };

    return (
      <div className="flex flex-col ml-9">
        <label className="font-poppins text-base ml-1 mb-2 font-thin" htmlFor={name}>{label}</label>
        <select className="font-poppins text-base w-80 h-7 bg-primarylight text-gray1 rounded-md px-2.5 mb-4" onChange={handleChange}>
          {
            options == undefined ? <option>No hay opciones</option> :
            options.map(option => (
             <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))
          }
        </select>
      </div>
    );
  }