import Header from "../../components/Header"
import { useState } from "react"
import { useServiciosConfirmados } from "../../hooks/useServiciosConfirmados"

export default function Confirmados() {
    const servicios = useServiciosConfirmados()
    return (
        <div className="w-screen flex flex-col items-start p-8">
        <Header titulo='Servicios confirmados'/>

        <table className="table-auto border-collapse w-full mt-14">
        <thead className="bg-slate-100 font-poppins">
          <tr className="text-left border-y border-x-0">
            <th className="border-r font-medium p-2">Programa</th>
            <th className="border-r font-medium p-2">Clase</th>
            <th className="border-r p-2 font-medium">Salon</th>
            <th className="border-r p-2 font-medium">Dia</th>
            <th className="border-r p-2 font-medium">Hora inicio</th>
            <th className="border-r p-2 font-medium">Hora fin</th>
            <th className="border-r p-2 font-medium">Hora inicio servicio</th>
            <th className="border-r p-2 font-medium">Hora fin servicio</th>
            <th className="border-r p-2 font-medium">Fecha inicio</th>
            <th className="border-r p-2 font-medium">Fecha fin</th>
            <th className="border-r p-2 font-medium">Número de servicios</th>
          </tr>
        </thead>
        <tbody className="font-poppins text-base">
          {servicios.map((servicio) => {
            return <>hola</>
          })}
        </tbody>
        </table>
        </div>
    )
}