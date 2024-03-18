import { useNavigate } from "react-router-dom";

export default function Error({ err }) {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-5">
      <h1 className="text-4xl font-bold text-red-500">
        Error {err.response.status}
      </h1>
      <h2 className="text-2xl font-bold text-red-500">
        {err.response.data.message}
      </h2>
      <div className="flex space-x-6">
        <button onClick={()=>{navigate(-1)}}>Volver</button>
        <button  onClick={()=>{navigate(0)}}>Reintentar</button>
      </div>
    </div>
  );
}
