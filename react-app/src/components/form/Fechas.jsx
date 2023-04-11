export default function Fechas(props) {
    const handleInicio = (e) => {
        props.setFechaInicio(e.target.value);
    };
    const inicio = props.value_inicio||'';
    const fin = props.value_fin||'';


    const handleFin = (e) => {
        props.setFechaFin(e.target.value);
    };

    return (
        <div className="flex w-full justify-between">
            <div className="flex flex-col">
                <label className="font-poppins text-sm mb-2 ml-1 font-thin">Fecha de inicio</label>
                <input className="w-36 font-poppins text-sm h-7 bg-primarylight text-gray1 rounded-md px-2.5 mb-4" type="date" onChange={handleInicio} defaultValue={inicio}/>
            </div>
            <div className="flex flex-col">
                <label className="font-poppins text-sm mb-2 ml-1 font-thin">Fecha de fin</label>
                <input className="w-36 font-poppins text-sm h-7 bg-primarylight text-gray1 rounded-md px-2.5 mb-4" type="date" onChange={handleFin} defaultValue={fin}/>
            </div>
        </div>
    );
  }