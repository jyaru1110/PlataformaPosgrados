import { Link } from "react-router-dom";
import Header from "../components/Header";
import Main from "../components/Main";

export default function Admin() {
  return (
    <div className="w-full  flex flex-col">
      <Header title="Admin" />
      <Main>
        <div className="flex flex-col">
          <Link to="/micrositio/admin/programas">Programas</Link>
          <Link to="/micrositio/admin/personas">Personas</Link>
        </div>
      </Main>
    </div>
  );
}
