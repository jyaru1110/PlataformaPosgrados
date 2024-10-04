import { useState } from "react";
export default function CardPuesto({ puesto, setPersonasPuesto }) {
  const copyEmails = (puesto) => {
    const emails = puesto?.reduce(
      (acc, persona) => acc + persona.usuario.email + "\n",
      ""
    );
    navigator.clipboard.writeText(emails);
    setHasBeenCopied(true);
    setTimeout(() => {
      setHasBeenCopied(false);
    }, 1300);
  };

  const [hasBeenCopied, setHasBeenCopied] = useState(false);

  return (
    <div
      key={puesto[0].puesto}
      className="w-72 bg-white shadow-md rounded-lg p-2.5 flex flex-col justify-between"
    >
      <span className="flex justify-between items-start">
        <p className="font-bold text-base leading-none mb-2">
          {puesto[0].puesto}
        </p>
        <button
          onClick={() => copyEmails(puesto)}
          className={`border relative border-grayborder rounded-md p-1 text-base ${
            hasBeenCopied
              ? "after:bg-primary/10 after:text-white after:text-sm after:bg-slate-300 after:rounded-md after:p-0.5 after:content-['Copiado'] after:absolute after:-top-7 after:-left-4"
              : ""
          }`}
        >
          {hasBeenCopied ? (
            <svg
              width="15"
              height="15"
              viewBox="0 0 16 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.7099 1.2101C14.617 1.11638 14.5064 1.04198 14.3845 0.991213C14.2627 0.940445 14.132 0.914307 13.9999 0.914307C13.8679 0.914307 13.7372 0.940445 13.6154 0.991213C13.4935 1.04198 13.3829 1.11638 13.29 1.2101L5.83995 8.6701L2.70995 5.5301C2.61343 5.43687 2.49949 5.36355 2.37463 5.31435C2.24978 5.26514 2.11645 5.24101 1.98227 5.24334C1.84809 5.24566 1.71568 5.27438 1.5926 5.32788C1.46953 5.38137 1.35819 5.45858 1.26495 5.55511C1.17171 5.65163 1.0984 5.76557 1.04919 5.89042C0.999989 6.01528 0.975859 6.1486 0.97818 6.28278C0.980502 6.41696 1.00923 6.54937 1.06272 6.67245C1.11622 6.79553 1.19343 6.90687 1.28995 7.0001L5.12995 10.8401C5.22291 10.9338 5.33351 11.0082 5.45537 11.059C5.57723 11.1098 5.70794 11.1359 5.83995 11.1359C5.97196 11.1359 6.10267 11.1098 6.22453 11.059C6.34639 11.0082 6.45699 10.9338 6.54995 10.8401L14.7099 2.68011C14.8115 2.58646 14.8925 2.47281 14.9479 2.34631C15.0033 2.21981 15.0319 2.08321 15.0319 1.94511C15.0319 1.807 15.0033 1.6704 14.9479 1.5439C14.8925 1.4174 14.8115 1.30375 14.7099 1.2101Z"
                fill="#ADBAC2"
              />
            </svg>
          ) : (
            <svg
              width="15"
              height="15"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <g clipPath="url(#clip0_130_141)">
                <path
                  d="M6.66671 0.416656H1.66671C1.20629 0.416656 0.833374 0.789573 0.833374 1.24999V7.08332H1.66671V1.24999H6.66671V0.416656ZM7.91671 2.08332H3.33337C2.87296 2.08332 2.50004 2.45624 2.50004 2.91666V8.74999C2.50004 9.21041 2.87296 9.58332 3.33337 9.58332H7.91671C8.37713 9.58332 8.75004 9.21041 8.75004 8.74999V2.91666C8.75004 2.45624 8.37713 2.08332 7.91671 2.08332ZM7.91671 8.74999H3.33337V2.91666H7.91671V8.74999Z"
                  fill="#ADBAC2"
                />
              </g>
              <defs>
                <clipPath id="clip0_130_141">
                  <rect width="10" height="10" fill="white" />
                </clipPath>
              </defs>
            </svg>
          )}
        </button>
      </span>
      <button
        onClick={() => setPersonasPuesto(puesto)}
        className="border border-grayborder rounded-lg p-1"
      >
        Ver {puesto.length} personas
      </button>
    </div>
  );
}
