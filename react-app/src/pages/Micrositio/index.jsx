import Nav from "./components/Nav";
import { Outlet } from "react-router-dom";

export default function Micrositio() {
  return (
    <div className="flex font-seravek">
      <Nav />
      <Outlet />
    </div>
  );
}