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
        className={`rounded-lg px-3 py-1 border border-grayborder ${
          filtered.length > 0 &&
          "bg-primary/20 text-primary border border-primary"
        }`}
      >
        {title}
      </button>
      {isSelected && (
        <div className="flex flex-col absolute top-10 bg-white py-2 px-1 rounded-lg border-grayborder border w-max z-50">
          {options.map((option) => (
            <label htmlFor={option} className="flex items-center space-x-3 hover:bg-grayborder px-1 py-0.5 rounded-md" key={option} >
              <input
                id={option}
                type="checkbox"
                className="mr-2"
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
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
