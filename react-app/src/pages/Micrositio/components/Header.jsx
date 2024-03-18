import { Link, useNavigate, useLocation } from "react-router-dom";
import { secciones } from "../constantes";

export default function Header({ title, children }) {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  return (
    <header className="w-full py-4 px-8 border border-grayborder flex items-end sticky">
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.25 19.5L9.75 13L16.25 6.5"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="flex-1 pl-10 space-y-2">
        <span>
          {location
            .substring(1)
            .split("/")
            .slice(0, -1)
            .map((route, index) => {
              return (
                <span key={index}>
                  {" "}
                  <Link to={secciones[route]?.ruta}>{secciones[route]?.title || route}</Link> /{" "}
                </span>
              );
            })}
        </span>
        <div className="flex w-full justify-start space-x-5">
          <h1 className="font-bold text-3xl leading-none">{title}</h1>
          {children}
        </div>
      </div>
      <img
        className="rounded-full"
        height={35}
        width={35}
        src={localStorage.getItem("foto")}
      />
    </header>
  );
}
