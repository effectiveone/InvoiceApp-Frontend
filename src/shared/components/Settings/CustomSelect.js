import React from "react";
import { useSettings } from "../../Hook/useSettings";
import { v4 as uuid } from "uuid";

const CustomSelect = ({ value, onChange, options, className, width }) => {
  const {
    isOpen,
    selectedOption,
    setSelectedOption,
    toggleOptions,
    // selectOption,
  } = useSettings();
  const selectOption = (option) => {
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
