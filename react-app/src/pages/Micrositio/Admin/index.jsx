import { Link } from "react-router-dom";
import MultiselectPrograma from "../components/MultiSelectPrograma";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import TablaPosgradosTipo from "./components/TablaPosgradosTipo";
import TablaPosgradosTotal from "./components/TablaPosgradosTotal";

export default function Admin() {
  const [escuelas, setEscuelas] = useState(['Gobierno y Economía', 'Bellas Artes', 'Derecho', 'Empresariales', 'ESDAI', 'Filosofía', 'Ingeniería', 'Comunicación', 'Pedagogía', 'Empresariales Santa Fe', 'Ciencias de la Salud']);

  const changeEscuelas = (programas) => {
    let programasArray = [];
    programas.forEach((programa) => {
      programasArray.push(programa.value);
    });

    setEscuelas(programasArray);
  };
  
  return (
    <div className="w-full  flex flex-col">
      <Header title="Admin" />
      <Main>
        <MultiselectPrograma onChange={changeEscuelas} />
        <article className="flex w-full justify-between">
          <TablaPosgradosTotal escuelas={escuelas} />
          <TablaPosgradosTipo />
        </article>
      </Main>
    </div>
  );
}
