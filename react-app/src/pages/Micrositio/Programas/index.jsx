import Header from "../components/Header";
import Accordion from "./Components/Accordion";
import Main from "../components/Main";
import { useEscuelasInfo } from "../../../hooks/useEscuelasInfo";
import { Link } from "react-router-dom";

export default function Programas() {
  const { escuelas, loading } = useEscuelasInfo();

  return (
    <div className="w-5/6 flex flex-col relative h-screen">
      <Header></Header>
      <Main>
        <div className="space-y-4">
          {escuelas.map((escuela) => {
            return (
              <Accordion
                header={
                  <h2 className="font-timesnr text-4xl">{escuela.escuela}</h2>
                }
                style={"bg-white shadow-md"}
                key={escuela.escuela}
              >
                {escuela.puesto_escuelas.length > 0 && (
                  <div className="bg-headerbg p-8 rounded-lg">
                    <table className="w-4/5">
                      <tbody>
                        {escuela?.puesto_escuelas?.map((puesto) => {
                          return (
                            <tr key={puesto.id} className="text-sm font-light">
                              <td className="font-medium">{puesto.puesto}</td>
                              <td>
                                {puesto.usuario?.titulo} {puesto.usuario.nombre}
                              </td>
                              <td>{puesto.usuario.email}</td>
                              <td>{puesto.usuario?.extension}</td>
                              <td>{puesto.usuario?.telefono}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                {escuela?.programas?.map((programa) => {
                  return (
                    <Accordion
                      key={programa.programa}
                      style={"bg-bgsecondary"}
                      header={
                        <span className="font-timesnr">
                          <h3 className="text-secondary text-2xl">
                            {programa.programa}
                          </h3>
                          <h4 className="text-primary text-xl">
                            {programa.codigo}
                          </h4>
                        </span>
                      }
                    >
                      <>
                        <div className="space-x-8 text-base font-light border-b border-secondary pb-2">
                          <span>{programa.campus}</span>
                          <span>{programa.modalidad}</span>
                          <span>{programa.tipo}</span>
                          <span>{programa.duracion} meses</span>
                          <span>{programa.rvoe}</span>
                        </div>
                        <table className="mt-6 w-4/5">
                          <tbody>
                            {programa?.puesto_programas?.map((puesto) => {
                              return (
                                <tr
                                  key={puesto.id}
                                  className="text-sm font-light"
                                >
                                  <td className="font-medium text-primary">
                                    {puesto.puesto}
                                  </td>
                                  <td>
                                    {puesto.usuario?.titulo}{" "}
                                    {puesto.usuario.nombre}
                                  </td>
                                  <td>{puesto.usuario.email}</td>
                                  <td>{puesto.usuario?.extension}</td>
                                  <td>{puesto.usuario?.telefono}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </>
                      <div className="space-x-4 mt-12">
                        <a className="text-white bg-primary px-3.5 py-2 rounded-full cursor-pointer" href={programa.website}>Website</a>
                        <a className="text-white bg-primary px-3.5 py-2 rounded-full cursor-pointer" href={programa.encarte}>Encarte</a>
                      </div>
                    </Accordion>
                  );
                })}
              </Accordion>
            );
          })}
        </div>
      </Main>
    </div>
  );
}
