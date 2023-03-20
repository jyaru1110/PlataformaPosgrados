export default function Dropdown(props) {
    const { options, name, label } = props;
    return (
      <div className="flex flex-col ml-9">
        <label className="font-poppins text-base text-gray-400" htmlFor={name}>{label}</label>
        <select className="font-poppins text-base">
          {options.map(option => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    );
  }