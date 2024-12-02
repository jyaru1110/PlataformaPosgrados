import { useState, useEffect } from "react";
export default function GradeCounter({ programs }) {
  const [grades, setGrades] = useState({});

  useEffect(() => {
    let grades = {}; 
    programs.forEach((program) => {
      if (grades[program.grado]) {
        grades[program.grado] += 1;
      } else {
        grades[program.grado] = 1;
      } 
    });
    setGrades(grades);
  }, [programs]);

  return (
    <>
      {Object.keys(grades).map((grade) => (
        <span key={grade} className="flex flex-col items-center text-[#707070]">
          <span className="font-bold text-4xl">{grades[grade]}</span>
          <span className="font-light">{grade}</span>
        </span>
      ))}
    </>
  );
}
