import { useState, useEffect, useRef } from "react";
export default function Filter({ title, options, filtered, setFiltered }) {
  const [isSelected, setIsSelected] = useState(false);
  const container = useRef(null);
  useEffect(() =>
    window.addEventListener("click", (ev) => {
      if (container.current && !container.current.contains(ev.target)) {
        setIsSelected(false);
      }
    })
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
        <div className="flex flex-col absolute top-10 bg-white p-2 rounded-lg border-grayborder border w-56 z-50">
          {options.map((option, index) => (
            <span key={option} className="flex items-center space-x-3">
              <input
                id={option}
                type="checkbox"
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
              <label htmlFor={option}>{option}</label>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
