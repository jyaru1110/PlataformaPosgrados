export default function SumaIslas(props) {
    return (
        <div className="flex ml-9 w-80 flex-col">
            <p className="font-poppins font-semibold text-base text-primary">Suma servicios por isla</p>
            {
                props.loading ? <div className="m-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div> :
                <div className="flex w-full">
                    {props.sumas.length >  0 ? 
                    <>
                        {props.sumas.map((isla) => (
                            <div key={isla.isla} className="flex flex-col items-center justify-center h-11 rounded-2xl bg-primarylight w-10">
                                <p className="font-poppins font-regular text-xs text-gray1">{isla.isla.substring(0,5)}</p>
                                <p className="font-poppins font-medium text-xs text-primary">{isla.servicios_totales}</p>
                            </div>
                        ))}
                    </>
                        :
                        <></>
                    }
                </div>
            }
        </div>
    )
}