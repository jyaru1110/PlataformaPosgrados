export default function BotonFooter(props) {
    return (
        <button className="h-24 w-60 ml-1.5 shadow-[0px_1px_4px_rgba(0,0,0,0.25)] rounded-2xl font-poppins font-semibold text-sm flex-none">
            <div className="flex h-full">
                <div className="flex  p-2 w-3/4 h-full text-xs flex-col justify-between">
                    <p className="text-left">{props.texto}</p>
                    <div className="bg-primary w-20 h-6 p-0 text-center pt-1 text-white rounded-2xl">{props.action}</div>
                </div>
                <img className="contain" src={props.imagen}></img>
            </div>
            
        </button>
    )
}