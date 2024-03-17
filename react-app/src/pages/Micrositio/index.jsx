import Nav from "./components/Nav";
import Header from "./components/Header";
import Main from "./components/Main";

export default function Micrositio() {
  return (
    <div className="flex font-seravek">
      <Nav />
      <div className="w-full  flex flex-col">
        <Header title="Micrositio"/>
        <Main>
          <h1>aquí va el main</h1>
        </Main>
      </div>
    </div>
  );
}
