export default function Fecha(props) {
    const handleFecha = (e) => {
        props.setFecha(e.target.value);
    };
    const fecha = props.value||'';
    const disabled = props.disabled||false;

    return (
        <div className="flex flex-col">
            <label className="font-poppins text-sm mb-2 ml-1 font-thin">Fecha del servicio</label>
            <input className="w-80 font-poppins text-sm h-7 bg-primarylight text-gray1 rounded-md px-2.5 mb-4" type="date" onChange={handleFecha} defaultValue={fecha} disabled={disabled}/>
        </div>
    );
  }