import { Link } from "react-router-dom";
import MultiselectPrograma from "../../components/MultiSelectPrograma";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Main from "../../components/Main";
import TablaPosgradosTipo from "../components/TablaPosgradosTipo";
import TablaPosgradosTotal from "../components/TablaPosgradosTotal";
import ChartsMetas from "../components/ChartsMetas";

export default function Dashboard() {
  const [escuelas, setEscuelas] = useState([
    "Gobierno y Economía",
    "Bellas Artes",
    "Derecho",
    "Empresariales",
    "ESDAI",
    "Filosofía",
    "Ingeniería",
    "Comunicación",
    "Pedagogía",
    "Empresariales Santa Fe",
    "Ciencias de la Salud",
  ]);

  const changeEscuelas = (programas) => {
    let programasArray = [];
    programas.forEach((programa) => {
      programasArray.push(programa.value);
    });

    setEscuelas(programasArray);
  };

  return (
    <div className="w-full  flex flex-col">
      <Header title="Dashboard posgrados" />
      <Main>
        <MultiselectPrograma onChange={changeEscuelas} />
        <article className="flex w-full justify-between mt-14">
          <TablaPosgradosTotal escuelas={escuelas} />
          <TablaPosgradosTipo escuelas={escuelas} />
        </article>
        <ChartsMetas escuelas={escuelas} />
      </Main>
    </div>
  );
}
