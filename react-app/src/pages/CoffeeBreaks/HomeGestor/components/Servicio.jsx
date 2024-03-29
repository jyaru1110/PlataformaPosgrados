export default function Servicio(props){
    const servicio = props.servicio_parm;
    return(
        <div className={`group/item w-full bg-primarylight text-primary p-2 my-2 rounded-xl flex justify-between items-center h-18 ${servicio.estado == 'Pendiente'? " opacity-50 z-0":" opacity-100"}`}>
            <div className="flex flex-row">
                <p className="font-poppins text-sm text-gray1">{servicio.hora_servicio_inicio?servicio.hora_servicio_inicio.substring(0,5):servicio.hora_inicio.substring(0,5)} - {servicio.hora_servicio_fin?servicio.hora_servicio_fin.substring(0,5):servicio.hora_fin.substring(0,5)}</p>
                <div className="ml-3.5">
                    <p className="font-poppins font-semibold text-sm">{servicio.isla}</p>
                    <p className="font-poppins text-sm font-thin text-gray1"> {servicio.salon_id} · {servicio.codigo}</p>
                    {servicio.num_servicios>0 ?
                        <div className="flex">
                            <p className="font-poppins text-sm font-semibold mr-1">{servicio.num_servicios}</p>
                            <p className="font-poppins text-sm text-gray1">servicios</p>
                        </div>
                        :
                        <p className="font-poppins text-sm text-gray1">Sin servicios</p>
                    }
                </div>
            </div>
        </div>
    )
}