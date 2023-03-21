export default function Servicio(props){
    const servicio = props.servicio_parm;
    return(
        <div className="group/item w-full bg-primary text-white p-2 my-2  rounded-xl flex justify-between items-center h-14">
            <div className="flex flex-row">
                <p className="font-poppins font-thin text-xs">{servicio.hora_inicio.substring(0,5)} - {servicio.hora_fin.substring(0,5)}</p>
                <div className="ml-3.5">
                    <p className="font-poppins font-semibold text-xs">{servicio.salon_id}</p>
                    <p className="font-poppins font-semibold text-xs">{servicio.estado}</p>
                    {servicio.num_servicios>0 ?
                        <p className="font-poppins text-xs">{servicio.num_servicios} servicios</p>:
                        <p className="font-poppins text-xs">Sin servicios</p>
                    }
                </div>
            </div>
        </div>
    )
}