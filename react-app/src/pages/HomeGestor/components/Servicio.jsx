export default function Servicio(props){
    const servicio = props.servicio_parm;
    return(
        <div className="group/item w-full bg-secondary hover:bg-cyan-800 p-2 my-2 text-white rounded-xl flex justify-between items-center">
            <div className="flex flex-row">
                <p className="font-poppins font-thin text-sm">{servicio.hora_inicio.substring(0,5)} - {servicio.hora_fin.substring(0,5)}</p>
                <div className="ml-3.5">
                    <p className="font-poppins font-semibold text-sm">{servicio.salon}</p>
                    <p className="font-poppins font-semibold text-sm">{servicio.estado}</p>
                    {servicio.num_servicios>0 ?
                        <p className="font-poppins text-sm">{servicio.num_servicios} servicios</p>:
                        <p className="font-poppins text-sm">Sin servicios</p>
                    }
                </div>
            </div>
        </div>
    )
}