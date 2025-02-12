import Header from "../components/Header";
import Main from "../components/Main";
import CardProyecto from "./Components/CardProyecto";
import { useProyectos } from "../../../hooks/useProyectos";
import EnrollmentStats from "./Components/EnrollmentStats";
import NextOpenings from "./Components/NextOpenings";

export default function Promocion() {
  const {loading, proyectos} = useProyectos("");
  return (
    <div className="w-5/6 flex flex-col relative h-screen">
      <Header></Header>
      <Main>
        <div className="w-full flex gap-5">
            <div className="w-2/3 gap-4">
              <EnrollmentStats></EnrollmentStats>
            </div> 
            <div className="w-1/3">
              <NextOpenings></NextOpenings>
            </div>
        </div>
      </Main>
    </div>
  );
}
