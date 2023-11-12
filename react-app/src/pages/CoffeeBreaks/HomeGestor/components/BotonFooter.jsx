
export default function BotonFooter(props) {
    return (
        <a href={props.ruta} className="h-20 w-48 ml-4 shadow-[2px_4px_12px_rgba(0,0,0,0.10)] rounded-2xl font-poppins flex-none z bg-white md:mt-2 md:w-full md:ml-0">
            <div className="flex h-full">
                <div className="flex p-2.5 h-full md:text-sm text-xs items-center">
                    <span>
                        <img src={props.children} className="w-8 h-8 mr-6" />
                    </span>
                    <p className="text-left font-semibold">{props.texto}</p>
                </div>
            </div>
            
        </a>
    )
}