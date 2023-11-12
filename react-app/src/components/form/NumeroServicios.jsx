export default function NumeroServicios(props) {
    const {setNumeroServicios} = props;
    const value = props.value||0;
    const disabled = props.disabled||false;

    const handleChange = (e) => {
        setNumeroServicios(e.target.value);
    };

    return (
        <div className="flex flex-col w-auto">
            <label className="font-poppins text-sm ml-1 mb-2 font-thin" htmlFor="numeroServicios">Número de servicios</label>
            <input type="number" className="font-poppins text-sm w-[142px] h-7 bg-primarylight text-gray1 rounded-md px-2.5 mb-4" onChange={handleChange} defaultValue={value} disabled={disabled}></input>
        </div>
    )
}
