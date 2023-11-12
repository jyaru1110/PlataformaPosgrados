import LogoPosgrados from "../../../assets/logoposgrados.png";
import { Link,useLocation } from "react-router-dom";

const rutas = [
  {
    path: "/seguimientoposgrados/",
    name: "Programas",
  },
  {
    path: "/seguimientoposgrados/etapasprocesos/nuevos",
    name: "Nuevos",
  },
  {
    path: "/seguimientosposgrados/etapasprocesos/actualizaciones",
    name: "Actualizaciones",
  },
];

export default function Header(props) {
  const location = useLocation();
  return (
    <div className="w-full bg-headerbg flex justify-center py-3">
      <div className="flex justify-between items-center w-5/6 font-timesnr">
        <div className="flex items-center">
          <img
            src={LogoPosgrados}
            height={54}
            width={46}
            className="mr-8"
          ></img>
          <h1 className="text-primary text-2xl">{props.titulo}</h1>
        </div>
        {rutas.map((ruta) => {
          return <Link to={ruta.path} className={`hover:bg-gray-200 p-2 rounded-md ${ruta.path==location.pathname?"text-primary":""}`}>{ruta.name}</Link>;
        })}
        <div>
          <h1 className="text-primary text-xl">
            Bienvenido {localStorage.getItem("nombre").split(" ")[0]}{" "}
            {localStorage.getItem("nombre").split(" ")[1]}
          </h1>
          <h1 className="text-secondary text-xl">
            {localStorage.getItem("escuela")}
          </h1>
        </div>
      </div>
    </div>
  );
}
