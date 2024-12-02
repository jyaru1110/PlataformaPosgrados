import { useRef } from "react";
export default function Buscador({children, setQuery}) {
  const searchRef = useRef(null);
  const timeOutRef = useRef(null);
  const search = () => {
    if (timeOutRef.current === null) {
      timeOutRef.current = setTimeout(() => {
        setQuery(searchRef.current.value);
        timeOutRef.current = null;
      }, 1100);
    }
  };
  return (
    <div className="bg-white px-4 py-6 shadow-header w-fit min-w-[42rem] max-w-full rounded-lg flex items-center mx-auto space-x-4">
      <input
        ref={searchRef}
        onChange={search}
        className="flex-grow px-3 min-w-[15rem] py-1 border border-[#CDCDCD] placeholder:text-[#CDCDCD] placeholder:font-light rounded-md"
        placeholder="Buscar"
      />
      {children}
    </div>
  );
}
