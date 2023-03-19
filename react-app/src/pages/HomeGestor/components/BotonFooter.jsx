export default function BotonFooter(props) {
    return (
        <button className="h-24 w-60 ml-5 shadow-[2px_4px_12px_rgba(0,0,0,0.20)] rounded-2xl font-poppins flex-none z bg-white md:mt-2 md:w-full md:ml-0">
            <div className="flex h-full">
                <div className="flex p-2.5 w-3/4 h-full text-xs flex-col justify-between">
                    <p className="text-left font-semibold text-base">{props.texto}</p>
                </div>
                <img className="contain" src={props.imagen}></img>
            </div>
            
        </button>
    )
}