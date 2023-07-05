import  { useState, useEffect } from 'react';
export default function OpcionesEstado(props) {
    const estados = props.estados;
    const setEstados = props.setEstados;
    const handleEstado = (e) => {
        const estado = e.target.value;
        if (estados.includes(estado)) {
            setEstados(estados.filter((e) => e !== estado));
        } else {
            setEstados([...estados, estado]);
        }
    };
    return (
        <div className="flex flex-col">
            <p className="font-poppins text-sm ml-1 mb-2 font-thin">Selecciona los servicios que deseas ver</p>
            <div className="flex justify-between w-80 font-poppins text-base">
                {
                    estados.includes("Pendiente") ?
                    <button className="bg-primary p-2 rounded-3xl text-white active:bg-primary text-sm" onClick={handleEstado} value="Pendiente">Pendiente</button> :
                    <button className="bg-primarylight p-2 rounded-3xl text-gray1 text-sm" onClick={handleEstado} value="Pendiente">Pendiente</button>
                }
                {
                    estados.includes("Cancelado") ?
                    <button className="bg-primary p-2 rounded-3xl text-white active:bg-primary text-sm" onClick={handleEstado} value="Cancelado">Cancelado</button> :
                    <button className="bg-primarylight p-2 rounded-3xl text-gray1 text-sm" onClick={handleEstado} value="Cancelado">Cancelado</button>
                }
                {
                    estados.includes("Realizado") ?
                    <button className="bg-primary p-2 rounded-3xl text-white active:bg-primary text-sm" onClick={handleEstado} value="Realizado">Realizado</button> :
                    <button className="bg-primarylight p-2 rounded-3xl text-gray1 text-sm" onClick={handleEstado} value="Realizado">Realizado</button>
                }
                {
                    estados.includes("Confirmado") ? 
                    <button className="bg-primary p-2 rounded-3xl text-white active:bg-primary text-sm" onClick={handleEstado} value="Confirmado">Confirmado</button> :
                    <button className="bg-primarylight p-2 rounded-3xl text-gray1 text-sm" onClick={handleEstado} value="Confirmado">Confirmado</button>
                }
            </div>
        </div>
    );
}