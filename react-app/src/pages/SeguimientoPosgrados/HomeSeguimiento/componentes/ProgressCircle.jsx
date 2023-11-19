export default function ProgressCircle(props) {
  if (Math.trunc(props.porcentaje) === 100) {
    return (
      <div className="w-full h-full items-center justify-center flex">
        <div className="h-8 w-8 rounded-full bg-complete flex items-center justify-center">
          <svg
            width="18"
            height="16"
            viewBox="0 0 16 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 6.5L5.5 10L14 2" stroke="white" strokeWidth="3" />
          </svg>
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
            stroke="#227B76"
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
