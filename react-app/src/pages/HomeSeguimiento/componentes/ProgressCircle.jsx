export default function ProgressCircle(props) {
  if (props.porcentaje === 100) {
    return (
      <div className="h-7 w-7 rounded-full bg-complete flex items-center justify-center">
        <svg
          width="16"
          height="12"
          viewBox="0 0 16 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 6.5L5.5 10L14 2" stroke="white" strokeWidth="3" />
        </svg>
      </div>
    );
  } else {
    return (
      <div className="w-full h-full relative text-black flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 26 26"
        >
          <circle
            stroke="#C9B608"
            strokeWidth="3"
            strokeDasharray="72,72"
            strokeDashoffset={72 - props.porcentaje * 0.72}
            cx="13"
            cy="13"
            r="11.5"
            fill="none"
          ></circle>
          <text x="7" y="15" fontSize="7">{props.porcentaje}%</text> 
        </svg>
      </div>
    );
  }
}
