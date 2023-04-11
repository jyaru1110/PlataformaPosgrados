export default function NumeroServicios(props) {
    const {setNumeroServicios} = props;
    const value = props.value||0;

    const handleChange = (e) => {
        setNumeroServicios(e.target.value);
    };

    return (
        <div className="flex flex-col">
            <label className="font-poppins text-sm ml-1 mb-2 font-thin" htmlFor="numeroServicios">Número de servicios</label>
            <input type="number" className="font-poppins text-sm w-auto h-7 bg-primarylight text-gray1 rounded-md px-2.5 mb-4" onChange={handleChange} defaultValue={value}></input>
        </div>
    )
}
