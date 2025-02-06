import React, { useState } from "react"

export function Select({ options, defaultValue, onChange, className = "" }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(defaultValue)

  const handleSelect = (value) => {
    setSelectedValue(value)
    setIsOpen(false)
    if (onChange) onChange(value)
  }

  return (
    <div className={`relative ${className}`}>
      <button
        className="flex items-center justify-between w-full px-3 py-2 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{options.find((option) => option.value === selectedValue)?.label}</span>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}