import Header from "../../components/Header";
export default function AddServicio() {
  return (
    <div className="w-screen flex flex-col items-center justify-center">
        <div className="p-4">
      <Header titulo="Añadir servicio"></Header>
      <table>
        <thead>
          <tr>
            <th>Escuela</th>
            <th>Programa</th>
            <th>Clase</th>
            <th>Salón</th>
            <th>Fecha</th>
            <th>Hora inicio</th>
            <th>Hora fin</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Escuela</td>
            <td>Programa</td>
            <td>Clase</td>
            <td>Salón</td>
            <td>Fecha</td>
            <td>Hora inicio</td>
            <td>Hora fin</td>
            <td>Estado</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
}
