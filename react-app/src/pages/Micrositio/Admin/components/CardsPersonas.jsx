import { useUsersByEscuela } from "../../../../hooks/useUsersByEscuela";

export default function CardsPersonas() {
  const { data, loading, error } = useUsersByEscuela();
  const reduceTotal = data?.reduce((acc, escuela) => acc + parseInt(escuela.total), 0);
  return (
    <article className="flex space-x-2.5 overflow-x-auto mb-3 w-full">
      <div
        className="bg-white rounded-xl py-1 px-3 justify-center flex flex-col"
      >
        <span className="text-sm font-light">Total</span>
        {
            loading ? <span className="rounded-lg h-8 animate-pulse bg-slate-100 w-10"></span>:
            <span className="text-2xl font-bold">{reduceTotal}</span>
        }
      </div>
      {data?.map((escuela) => {
        return (
          <div
            className="border border-slate-100 bg-white rounded-xl py-1 px-3 justify-center flex flex-col"
            key={escuela.escuela}
          >
            <span className="text-xs font-light">{escuela?.escuela}</span>
            <span className="text-2xl font-bold">{escuela?.total}</span>
          </div>
        );
      })}
    </article>
  );
}
