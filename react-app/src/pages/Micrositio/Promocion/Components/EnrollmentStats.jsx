import React from "react"
import { usePeriodoPrograma } from "../../../../hooks/usePeriodoPrograma"
import { useState } from "react";
import { escuelas } from "../../constantes";
import { usePeriodos } from "../../../../hooks/usePeriodos";
import { useMetasEscuela } from "../../../../hooks/useMetasEscuela";

export default function EnrollmentStats() {
  const { loading, metas, update } = usePeriodoPrograma();
  const { data } = useMetasEscuela();
  const { periodos } = usePeriodos();

  const [filteredEscuelas, setFilteredEscuelas] = useState("Comunicación");
  const [filteredPeriodos, setFilteredPeriodos] = useState("2024-2025");

  const filterMetas = (meta) => {
    return (
      (filteredEscuelas == meta?.programa?.escuela  &&
        filteredPeriodos == meta?.periodo?.periodo_nombre)
    );
  };

  const filterMetaEscuela = (meta) => {
    return (
      (filteredEscuelas == meta?.escuela &&
        filteredPeriodos == meta?.periodo_nombre
      )
    );
  }

  return (
    <div className="p-6 border border-secondary rounded-lg mb-5 bg-lightsecondary">
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <h2 className="text-3xl font-serif">Meta de alumnos de</h2>
          <select className="w-[300px] text-secondary font-timesnr text-3xl mt-2" onChange={(e)=>{setFilteredEscuelas(e.target.value)}}>
            {
              escuelas.map((escuela)=>{
                return <option key={escuela} value={escuela} label={escuela}></option>
              })
            }
          </select>
        </div>
        <div>
          <select className="w-[130px] text-secondary font-timesnr text-2xl" onChange={(e)=>{setFilteredPeriodos(e.target.value)}}>
            {
              periodos.map((periodo)=>{
                return <option key={periodo.id} value={periodo.periodo_nombre} label={periodo.periodo_nombre}></option>
              })
            }
          </select>
        </div>

        <div className="grid grid-cols-7 gap-2">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span className="font-timesnr text-secondary text-center text-xl">Meta</span>
          <span className="font-timesnr text-primary text-center text-xl">Inscritos</span>
          <span className="font-timesnr text-center text-xl">Avance</span>
          {
            metas.filter(filterMetas).map((meta) => (
             <React.Fragment key={meta.id}>  
              <span className="text-[#2A665F] font-timesnr text-lg">{meta.programa.codigo}</span>
              <div className="col-span-3 h-6 bg-[#D9E3E2] overflow-hidden">
                <div
                  className="h-full bg-[#2A665F]"
                  style={{ width: `${meta.num_inscripciones == 0?"0":(meta.num_inscripciones / meta.meta_inscripciones) * 100}%` }}
                ></div>
              </div>
              <span className="text-[#B08D57] text-center font-medium text-lg">{meta.meta_inscripciones}</span>
              <span className="text-[#2A665F] text-center font-medium text-lg">{meta.num_inscripciones}</span>
              <span className="text-center font-medium text-lg">{meta.meta_inscripciones !=0 && meta.num_inscripciones !=0 ? `${Math.round((meta.num_inscripciones / meta.meta_inscripciones) * 100)}%` : "0%"}</span>
             </React.Fragment>
            ))
          }
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <div className="h-0.5 col-span-3 bg-secondary w-full"></div>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          {
            data?.filter(filterMetaEscuela).map((meta) => (
              <React.Fragment key={meta.escuela}>
                <span className="text-[#B08D57] text-center font-medium text-lg">{meta?.total_meta_inscripciones}</span>
                <span className="text-[#2A665F] text-center font-medium text-lg">{meta?.num_inscripciones}</span>
                <span className="text-center font-medium text-lg">{meta.total_meta_inscripciones !=0 && meta.num_inscripciones !=0 ? `${Math.round((meta.num_inscripciones / meta.total_meta_inscripciones) * 100)}%` : "0%"}</span>
              </React.Fragment>
            ))
          }
        </div>

        <p className="text-gray-500 text-sm italic">Última actualización: 5/12/24</p>
      </div>
    </div>
  )
}