import { useState, useEffect, useRef } from "react";
export default function Filter({ title, options, filtered, setFiltered }) {
  const [isSelected, setIsSelected] = useState(false);
  const container = useRef(null);
  useEffect(
    () =>
      window.addEventListener("click", (ev) => {
        if (container.current && !container.current.contains(ev.target)) {
          setIsSelected(false);
        }
        return () => {
          window.removeEventListener("click", (ev) => {
            if (container.current && !container.current.contains(ev.target)) {
              setIsSelected(false);
            }
          });
        };
      }),
    []
  );
  return (
    <div ref={container} className="relative">
      <button
        onClick={() => setIsSelected((prev) => !prev)}
        className={`rounded-lg px-3 py-2 border border-secondary text-secondary ${
          filtered.length > 0 &&
          "bg-secondary text-white border-transparent"
        }`}
      >
        {title}
      </button>
      {isSelected && (
        <div className="flex flex-col absolute top-12 bg-white py-2 px-1 rounded-lg border-secondary border w-max z-50">
          {options.map((option) => (
            <label htmlFor={option} className="flex items-center space-x-3 hover:bg-secondary/10 px-1 py-0.5 text-secondary rounded-md" key={option} >
              <input
                id={option}
                type="checkbox"
                className="mr-2 peer relative appearance-none w-4 h-4 border border-secondary rounded-sm bg-white checked:bg-secondary checked:border-transparent"
                checked={filtered.includes(option)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFiltered((prev) => [...prev, option]);
                  } else {
                    setFiltered((prev) =>
                      prev.filter((item) => item !== option)
                    );
                  }
                }}
              />
              <svg className="absolute left-0 w-2.5 h-2.5 pointer-events-none hidden peer-checked:block stroke-white outline-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" > <polyline points="20 6 9 17 4 12"></polyline> </svg>
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
