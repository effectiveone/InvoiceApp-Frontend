import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleCheckbox,
  selectOption,
} from "../../store/actions/templateActions";

const TemplateCheckbox = () => {
  const dispatch = useDispatch();

  const selectedOption = useSelector((state) => state?.template.selectedOption);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "50px",
        }}
      >
        {" "}
        <label>
          <input
            type="radio"
            name="option"
            value="basicInput"
            checked={selectedOption === "basicInput"}
            onChange={() => dispatch(selectOption("basicInput"))}
          />
          Basic Input
        </label>
        <label>
          <input
            type="radio"
            name="option"
            value="mediumInput"
            checked={selectedOption === "mediumInput"}
            onChange={() => dispatch(selectOption("mediumInput"))}
          />
          Medium Input
        </label>
        <label>
          <input
            type="radio"
            name="option"
            value="printerInput"
            checked={selectedOption === "printerInput"}
            onChange={() => dispatch(selectOption("printerInput"))}
          />
          Printer Input
        </label>
      </div>
    </div>
  );
};

export default TemplateCheckbox;
