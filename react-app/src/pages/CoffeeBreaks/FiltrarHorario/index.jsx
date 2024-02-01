import DropdownProgramas from "../../../components/form/DropdownProgramas";
import DropdownDia from "../../../components/form/DropdownDia";
import DropdowClase from "../../../components/form/DropdownClase";
import Horas from "../../../components/form/Horas";
import Fechas from "../../../components/form/Fechas";
import DropdownSalon from "../../../components/form/DropdownSalon";
import { useHorarios } from "../../../hooks/useHorarios";
import { date_to_dd_monthshort_yyyy } from "../../../utils/date_to_string";
import { useState } from "react";
import ButtonAdd from "../HomeGestor/components/ButtonAdd";
import Header from "../../../components/Header";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function FiltrarHorario() {
  //relacionado con la navegación
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  //fecha actual
  const date = new Date();
  //campos de busqueda
  const programa = searchParams.get("programa") || "Todos";
  const dia = searchParams.get("dia") || "Todos";
  const clase = searchParams.get("clase") || "Todos";
  const hora_inicio = searchParams.get("hora_inicio") || "Todos";
  const hora_fin = searchParams.get("hora_fin") || "Todos";
  const fecha_inicio =
    searchParams.get("fecha_inicio") || date.toISOString().substring(0, 10);
  const fecha_fin = searchParams.get("fecha_fin") || "Todos";
  const salones = searchParams.get("salones") || "Todos";
  //resultado de los horarios
  const resultado = useHorarios();
  const horarios = resultado.horarios;
  const loading = resultado.loading;
  //funciones para filtrar
  const filtrar = (horario) => {
    if (programa !== "Todos" && horario.programa !== programa) {
      return false;
    }
    if (dia !== "Todos" && horario.dia !== dia) {
      return false;
    }
    if (clase !== "Todos" && horario.no_clase !== clase) {
      return false;
    }
    if (
      hora_inicio !== "Todos" &&
      horario.hora_inicio.substring(0, 5) < hora_inicio
    ) {
      return false;
    }
    if (hora_fin !== "Todos" && horario.hora_fin.substring(0, 5) > hora_fin) {
      return false;
    }
    if (fecha_inicio !== "Todos" && horario.fecha_fin < fecha_inicio) {
      return false;
    }
    if (fecha_fin !== "Todos" && horario.fecha_fin > fecha_fin) {
      return false;
    }
    if (salones !== "Todos" && horario.salon !== salones) {
      return false;
    }
    return true;
  };

  return (
    <div className="w-11/12 pt-2 sm:flex sm:w-full">
      <div className="md:fixed ml-9 w-80">
        <Header titulo="Buscar horario"></Header>
        <DropdownProgramas
          func={(valuePrograma) => {
            searchParams.set("programa", valuePrograma);
            setSearchParams(searchParams);
          }}
          escuela={
            localStorage.getItem("rol") !== "Gestor"
              ? localStorage.getItem("escuela")
              : "Todos"
          }
          value={programa}
        />
        <DropdowClase
          func={(claseValue) => {
            searchParams.set("clase", claseValue);
            setSearchParams(searchParams);
          }}
          value={clase}
        />
        <DropdownSalon
          func={(salonValue) => {
            searchParams.set("salones", salonValue);
            setSearchParams(searchParams);
          }}
          value={salones}
        />
        <DropdownDia
          func={(diaValue) => {
            searchParams.set("dia", diaValue);
            setSearchParams(searchParams);
          }}
          value={dia}
        />
        <Horas
          setHoraFin={(horaFinValue) => {
            searchParams.set("hora_fin", horaFinValue);
            setSearchParams(searchParams);
          }}
          setHoraInicio={(horaInicioValue) => {
            searchParams.set("hora_inicio", horaInicioValue);
            setSearchParams(searchParams);
          }}
          value_inicio={hora_inicio}
          value_fin={hora_fin}
        />
        <Fechas
          setFechaFin={(fechaFinValue) => {
            searchParams.set("fecha_fin", fechaFinValue);
            setSearchParams(searchParams);
          }}
          setFechaInicio={(fechaInicioValue) => {
            searchParams.set("fecha_inicio", fechaInicioValue);
            setSearchParams(searchParams);
          }}
          value_inicio={fecha_inicio}
          value_fin={fecha_fin}
        />
      </div>
      {loading ? (
        <div className="m-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      ) : (
        <div className="flex flex-wrap md:ml-96 w-full">
          {horarios.filter(filtrar).map((horario) => (
            <div
              key={horario.id_horario}
              onClick={() => {
                navigate("/horario/" + horario.id_horario);
              }}
              className="rounded-3xl bg-primarylight w-80 ml-9 mb-4 p-2.5 md:ml-2 min-h-28 text-xs flex items-center justify-between cursor-pointer hover:shadow-md transition duration-300 ease-in-out"
            >
              <div>
                <p className="font-poppins text-primary font-semibold mb-2">
                  Clase {horario.no_clase}
                </p>
                <p className="font-poppins text-gray1 mb-1">
                  {horario.dia},{" "}
                  {horario.hora_servicio_inicio
                    ? horario.hora_servicio_inicio.substring(0, 5)
                    : horario.hora_inicio.substring(0, 5)}{" "}
                  a{" "}
                  {horario.hora_servicio_fin
                    ? horario.hora_servicio_fin.substring(0, 5)
                    : horario.hora_fin.substring(0, 5)}{" "}
                  • {horario.salon}
                </p>
                <p className="font-poppins text-gray1 mb-1">
                  {date_to_dd_monthshort_yyyy(horario.fecha_inicio)} -{" "}
                  {date_to_dd_monthshort_yyyy(horario.fecha_fin)}
                </p>
                <p className="font-poppins text-gray1 mb-1 font-medium">
                  {horario.programa}
                </p>
              </div>
              <div className="text-center text-gray1">
                <p className="font-poppins text-primary font-bold text-base">
                  {horario.num_alumnos > 0 ? horario.num_alumnos : "Sin"}
                </p>
                servicios
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="fixed right-14 bottom-14">
        <ButtonAdd />
      </div>
    </div>
  );
}
