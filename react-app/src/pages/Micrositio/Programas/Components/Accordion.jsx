import { useState } from "react";
export default function Accordion({ header, children, style }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`${style} py-6 px-8 h-auto rounded-lg transition-all flex flex-col`}
    >
      <div
        className={`cursor-pointer flex items-center justify-between w-full`}
        onClick={() => setOpen(!open)}
      >
        {header}
        <span>{open ? "-" : "+"}</span>
      </div>
      {open && <div className="mt-5 h-auto space-y-4">{children}</div>}
    </div>
  );
}
