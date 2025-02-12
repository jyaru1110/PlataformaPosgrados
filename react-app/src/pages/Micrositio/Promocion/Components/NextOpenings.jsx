import { escuelas } from "../../constantes";
import { useState } from "react";
import { usePeriodoEscuela } from "../../../../hooks/useMetasEscuela";

export default function NextOpenings() {
    const [escuela, setEscuela] = useState(localStorage.getItem("escuela") || "Bellas Artes");
    const [pagina, setPagina] = useState(1);

    const {data} = usePeriodoEscuela(escuela, pagina);

    const handleEscuelaChanged = (e) => {
        setEscuela(e.target.value);
        setPagina(1);
    }

    return <div className="p-6 border border-secondary rounded-lg mb-5 bg-lightsecondary text-center space-y-3">
        <h2 className="font-timesnr text-3xl">Próximas aperturas</h2>
        <select className="w-[270px] text-secondary font-timesnr text-2xl mt-2 text-center" defaultValue={escuela} onChange={handleEscuelaChanged}>
            {
              escuelas.map((escuela)=>{
                return <option key={escuela} value={escuela} label={escuela}></option>
              })
            }
            <option value="Todas" label="Todas"></option>
        </select> 
        <div>
        {
            data?.periodos?.map((periodo)=>{
                return <div key={periodo.id} className="flex justify-between font-light w-52 m-auto">
                    <span className="text-left font-timesnr text-primary text-xl">{periodo.programa.codigo}</span>
                    <span className="text-right text-xl">{periodo.fecha_inicio?.substring(0,10).split("-").reverse().join("/")}</span>
                </div>
            })
        }
        </div>
        <div>
            {
                data &&
                [...Array(Math.ceil(data?.count/4)).keys()].filter((value)=>value!=0).map((page)=>{
                    return <button key={page} className={`text-lg p-2 hover:bg-secondary/30 text-secondary rounded-md ${page == pagina && "font-extrabold"}`} onClick={()=>{setPagina(page)}}>{page}</button>
                })
            }
        </div>
    </div>
}