import React from "react"
import { Select } from "./Select"

const programs = [
  { name: "MCOMI", enrolled: 70, goal: 100 },
  { name: "MCPP", enrolled: 70, goal: 100 },
  { name: "MCM", enrolled: 70, goal: 100 },
]

export default function EnrollmentStats() {
  return (
    <div className="p-6 border border-secondary rounded-lg mb-5 bg-lightsecondary">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-serif">Meta de alumnos de</h2>
          <Select
            options={[{ value: "comunicacion", label: "Comunicación" }]}
            defaultValue="comunicacion"
            className="w-[180px] text-secondary font-timesnr text-2xl"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select
            options={[{ value: "2024-2025", label: "2024 - 2025" }]}
            defaultValue="2024-2025"
            className="w-[180px] text-secondary font-timesnr text-2xl"
          />
        </div>

        <div className="space-y-6 mt-8">
          {programs.map((program) => (
            <div key={program.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[#2A665F] font-medium">{program.name}</span>
                <div className="flex gap-12">
                  <span className="text-[#B08D57]">{program.goal}</span>
                  <span className="text-[#2A665F]">{program.enrolled}</span>
                  <span>{Math.round((program.enrolled / program.goal) * 100)}%</span>
                </div>
              </div>
              <div className="h-6 bg-[#D9E3E2]  overflow-hidden">
                <div
                  className="h-full bg-[#2A665F]"
                  style={{ width: `${(program.enrolled / program.goal) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}

          <div className="pt-4 border-t border-[#B08D57]">
            <div className="flex items-center justify-between">
              <span className="text-[#B08D57]">300</span>
              <span className="text-[#2A665F]">210</span>
              <span>70%</span>
            </div>
          </div>
        </div>

        <p className="text-gray-500 text-sm italic">Última actualización: 5/12/24</p>
      </div>
    </div>
  )
}