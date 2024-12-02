import { useState, useEffect } from "react";
export default function ResumedPuestos({ puestos }) {
  const [puestosCount, setPuestosCount] = useState({});
  useEffect(() => {
    let puestosCount = {};
    puestos.forEach((puesto) => {
      if (puestosCount[puesto.puesto]) {
        puestosCount[puesto.puesto] += puesto.programa.codigo+",  ";
      } else {
        puestosCount[puesto.puesto] = puesto.programa.codigo+",  ";
      }
    });
    setPuestosCount(puestosCount);
  }, [puestos]);

  return (
    <>
      {Object.keys(puestosCount).map((puesto) => (
        <span key={puesto} className="flex flex-col mt-2 font-timesnr">
          <span className="font-light">{puesto}</span>
          <span className="font-light text-primary">{puestosCount[puesto].slice(0,-3)}</span>
        </span>
      ))}
    </>
  );
}