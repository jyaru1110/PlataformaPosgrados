export default function Horas(props) {
    const handleInicio = (e) => {
        props.setFechaInicio(e.target.value);
    };

    const handleFin = (e) => {
        props.setFechaFin(e.target.value);
    };

    return (
        <div className="flex ml-9 w-80 justify-between">
            <div className="flex flex-col">
                <label className="font-poppins text-sm mb-2 ml-1 font-thin">Fecha de inicio</label>
                <input className="w-36 font-poppins text-sm h-7 bg-primarylight text-gray1 rounded-md px-2.5 mb-4" type="date" onChange={handleInicio}/>
            </div>
            <div className="flex flex-col">
                <label className="font-poppins text-sm mb-2 ml-1 font-thin">Fecha de fin</label>
                <input className="w-36 font-poppins text-sm h-7 bg-primarylight text-gray1 rounded-md px-2.5 mb-4" type="date" onChange={handleFin}/>
            </div>
        </div>
    );
  }