import { useState } from "react";
import Header from "../components/Header";
import Main from "../../components/Main";
import TablaPosgradosTipo from "../components/TablaPosgradosTipo";
import TablaPosgradosTotal from "../components/TablaPosgradosTotal";
import ChartsMetas from "../components/ChartsMetas";
import Filter from "../../components/Filter";
import CardsPersonas from "../components/CardsPersonas";
import { escuelas } from "../../constantes";

export default function DashboardProgramas() {
  const [filteredEscuelas, setFilteredEscuelas] = useState(escuelas);

  return (
    <div className="w-full min-w-[1117px] flex flex-col h-screen">
      <Header title="Dashboard posgrados">
        <Filter
          filtered={filteredEscuelas}
          setFiltered={setFilteredEscuelas}
          options={escuelas}
          title={"Escuelas"}
        />
      </Header>
      <Main>
        <h2 className="ml-2 font-bold text-2xl mb-1">Personas por escuela</h2>
        <CardsPersonas />
        <article className="flex w-full justify-between">
          <TablaPosgradosTotal escuelas={filteredEscuelas} />
          <TablaPosgradosTipo escuelas={filteredEscuelas} />
        </article>
        <ChartsMetas escuelas={filteredEscuelas} />
      </Main>
    </div>
  );
}
