import { useParams } from "react-router-dom";

export default function Programas() {
  const { id } = useParams();
  return (
    <div>
      <h1>Programas {id}</h1>
    </div>
  );
}
