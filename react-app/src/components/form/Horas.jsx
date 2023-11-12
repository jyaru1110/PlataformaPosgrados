export default function Horas(props) {
    const handleInicio = (e) => {
        props.setHoraInicio(e.target.value);
    };

    const inicio = props.value_inicio||'';
    const fin = props.value_fin||'';
    const disabled = props.disabled||false;

    const handleFin = (e) => {
        props.setHoraFin(e.target.value);
    };

    return (
        <div className="flex w-full justify-between">
            <div className="flex flex-col">
                <label className="font-poppins text-sm ml-1 mb-2 font-thin">Hora de inicio</label>
                <input className="w-36 font-poppins text-sm h-7 bg-primarylight text-gray1 rounded-md px-2.5 mb-4" type="time" onChange={handleInicio} defaultValue={inicio} disabled={disabled}/>
            </div>
            <div className="flex flex-col">
                <label className="font-poppins text-sm ml-1 mb-2 font-thin">Hora de fin</label>
                <input className="w-36 font-poppins text-sm h-7 bg-primarylight text-gray1 rounded-md px-2.5 mb-4" type="time" onChange={handleFin} defaultValue={fin} disabled={disabled}/>
            </div>
        </div>
    );
  }