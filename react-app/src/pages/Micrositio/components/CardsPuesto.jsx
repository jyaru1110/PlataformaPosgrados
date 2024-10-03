import useUsersByPuesto from "../../../hooks/useUsersByPuesto";
export default function CardsPuesto() {
  const { puestos, loading, error } = useUsersByPuesto();

  const copyEmails = (puesto) => {
    const emails = puesto?.reduce(
      (acc, persona) => acc + persona.usuario.email + "\n",
      ""
    );
    navigator.clipboard.writeText(emails);
  };
  return (
    <div className="mt-10 flex space-x-2.5">
      {!loading ? (
        puestos.map((puesto) => {
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
                  className="border border-grayborder rounded-md p-1 text-base"
                >
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
                </button>
              </span>
              <button className="border border-grayborder rounded-lg p-1">
                Ver miembros
              </button>
            </div>
          );
        })
      ) : (
        <div className="w-56 h-24 bg-white shadow-md rounded-lg p-2.5 flex flex-col justify-between">
          <span className="flex justify-between items-start">
            <span className="w-20 h-5 bg-slate-100 rounded-md animate-pulse"></span>
            <button className="border border-grayborder rounded-md p-1 text-base">
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
            </button>
          </span>
          <button className="border border-grayborder rounded-lg p-1">
            Ver miembros
          </button>
        </div>
      )}
    </div>
  );
}
