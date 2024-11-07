import { useState } from "react";
export default function Accordion({ header, children, style }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`${style} p-4 h-[calc-size(auto)] rounded-lg transition-all flex flex-col`}
    >
      <div
        className={`cursor-pointer flex items-center justify-between w-full`}
        onClick={() => setOpen(!open)}
      >
        {header}
        <span>{open ? "-" : "+"}</span>
      </div>
      {open && <div className="mt-5 space-y-4">{children}</div>}
    </div>
  );
}
