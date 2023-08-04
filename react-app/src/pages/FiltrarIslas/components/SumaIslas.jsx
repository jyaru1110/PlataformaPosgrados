export default function SumaIslas(props) {
    return (
        <div className="flex ml-9 w-80 flex-col">
            <p className="font-poppins font-semibold text-lg text-primary">Suma servicios por isla</p>
            {
                props.loading ? <div className="m-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div> :
                <div className="flex w-full">
                    {props.sumas.length >  0 ? 
                    <>
                        {props.sumas.map((isla) => (
                            <div key={isla.isla} className="flex flex-col items-center justify-center h-12 rounded-2xl bg-primarylight w-11 mr-2">
                                <p className="font-poppins font-thin text-xs text-gray1">{isla.isla?isla.isla.substring(0,4):'Sin Sa'}</p>
                                <p className="font-poppins font-semibold text-sm text-primary">{isla.servicios_totales}</p>
                            </div>
                        ))}
                    </>
                        :
                        <p className="font-poppins text-sm font-light">No hay servicios en ninguna isla</p>
                    }
                </div>
            }
        </div>
    )
}