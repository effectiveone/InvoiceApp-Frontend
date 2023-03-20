import React from "react";
import { useSettings } from "../../Hook/useSettings";
import { v4 as uuid } from "uuid";

interface Option {
  value: string;
  icon: JSX.Element;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  className?: string;
  width?: string;
}

const CustomSelect = ({
  value,
  onChange,
  options,
  className = "",
  width = "",
}: CustomSelectProps) => {
  const { isOpen, selectedOption, setSelectedOption, toggleOptions } =
    useSettings();

  const selectOption = (option: Option) => {
    setSelectedOption(option);
    onChange(option.value);
    toggleOptions();
  };

  return (
    <div
      className={`select-container ${className}`}
      style={{ width }}
      onClick={toggleOptions}
    >
      <div className="selected-option"> {selectedOption.icon}</div>
      {isOpen && (
        <div className="options">
          {options.map((option) => (
            <div
              key={uuid()}
              className="option"
              onClick={() => selectOption(option)}
            >
              {option.icon}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
