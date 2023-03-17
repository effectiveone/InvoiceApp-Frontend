import React, { useState, useEffect } from "react";
import Layout from "../shared/components/layout/layout";
import { useSelector, useDispatch } from "react-redux";
import { setTheme, changeTheme } from "../store/actions/designActions";
import { US, PL, FR } from "country-flag-icons/react/3x2";
import { v4 as uuid } from "uuid";
import i18n from "../i18n";
import TemplateCheckbox from "../shared/components/templateCheckbox";
import { Grid } from "@material-ui/core";

const Settings = () => {
  const [language, setLanguage] = useState("en");
  const options = [
    { value: "en", icon: <US /> },
    { value: "pl", icon: <PL /> },
    { value: "fr", icon: <FR /> },
  ];

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, setLanguage]);
  const mySystemOfDesign = useSelector(
    (state) => state.design.mySystemOfDesign
  );
  const selectedDesign = useSelector((state) => state.design.selectedDesign);
  const dispatch = useDispatch();

  const handleThemeChange = (event) => {
    const { value } = event.target;
    dispatch(changeTheme(value)); // dodaj dispatch tutaj
  };
  const handleChange = (e) => {
    const selectedDesign = mySystemOfDesign.find(
      (design) => design.name === e.target.value
    );
    dispatch(setTheme(selectedDesign));
  };
  return (
    <>
      <Grid
        style={{
          margin: "20px 20px 20px 20px",
          height: "200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <select value={selectedDesign?.name} onChange={handleThemeChange}>
          {mySystemOfDesign?.map((design) => (
            <option key={design.name} value={design.name}>
              {design.name}
            </option>
          ))}
        </select>
        <CustomSelect
          value={language}
          onChange={(e) => setLanguage(e)}
          options={options}
          className="language-select"
          width="30px"
        />
        <TemplateCheckbox />
      </Grid>
    </>
  );
};

export default Layout(Settings);

const CustomSelect = ({ value, onChange, options, className, width }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    value: "en",
    icon: <US />,
  });

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

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
