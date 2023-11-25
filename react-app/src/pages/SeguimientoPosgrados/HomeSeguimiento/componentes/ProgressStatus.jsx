export default function ProgressStatus(props) {
    if (Math.trunc(props.porcentaje) >= 99) {
      return (
        <div className="w-full h-full items-center justify-center flex">
          <div className="rounded-full text-[10px] font-medium bg-secondary p-0.5 text-white flex items-center justify-center">
           COMPLETADO
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full h-full py-2 relative text-black flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 26 26"
          >
            <circle
              stroke="#F8F8F8"
              strokeWidth="3"
              strokeDasharray="72,72"
              strokeDashoffset={0}
              cx="13"
              cy="13"
              r="11.5"
              fill="none"
            ></circle>
            <circle
              stroke="#B78F4E"
              strokeWidth="3" 
              strokeDasharray="72,72"
              strokeDashoffset={72 - props.porcentaje * 0.72}
              cx="13"
              cy="13"
              r="11.5"
              fill="none"
            ></circle>
  
            <text x="7" y="15" fontSize="7">
              {Math.trunc(props.porcentaje)}%
            </text>
          </svg>
        </div>
      );
    }
  }
  