import Table from "../../components/Table";
import { useEffect, useRef } from "react";
export default function ModalPuestos({ miembros, close }) {
  const modalRef = useRef(null);
  useEffect(() => {
    const handleClick = (e) => {
      if (!modalRef.current?.contains(e.target)) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  if (miembros?.length > 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <div
          ref={modalRef}
          className="bg-white rounded-lg p-7 max-h-[450px] overflow-y-auto relative"
        >
          <h3 className="text-2xl ml-2 font-bold sticky -top-7 bg-white">
            {miembros[0].puesto}
          </h3>
          <Table
            headers={[
              "Nombre",
              miembros[0].escuelaEscuela ? "Escuela" : "Programa",
              "Email",
              "Teléfono",
              "Extensión",
            ]}
          >
            {miembros.map((persona,index) => {
              return (
                <tr
                  key={index}
                  className="border-b border-grayborder hover:bg-grayborder transition-all ease-in-out duration-300"
                >
                  <td className="pr-5">{persona.usuario.nombre}</td>
                  <td className="pr-5">
                    {persona.escuelaEscuela
                      ? persona.escuelaEscuela
                      : persona.programaPrograma}
                  </td>
                  <td className="pr-5">{persona.usuario.email}</td>
                  <td className="pr-5">{persona.usuario.telefono}</td>
                  <td className="text-right pr-5">
                    {persona.usuario.extension}
                  </td>
                </tr>
              );
            })}
          </Table>
        </div>
      </div>
    );
  }
}
