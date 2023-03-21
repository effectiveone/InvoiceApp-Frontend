import React from "react";
import { Grid } from "@material-ui/core";
import { useSettings } from "../../Hook/useSettings";
import CustomSelect from "./CustomSelect";
import TemplateCheckbox from "./templateCheckbox";

const Settings = () => {
  const {
    handleLang,
    language,
    options,
    mySystemOfDesign,
    handleThemeChange,
    selectedDesign,
    handleChange,
  } = useSettings();

  return (
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
      <select value={selectedDesign} onChange={handleThemeChange}>
        {mySystemOfDesign?.map((design) => (
          <option key={design.name} value={design.name}>
            {design.name}
          </option>
        ))}
      </select>
      <CustomSelect
        value={language}
        onChange={(e) => handleLang(e)}
        options={options}
        className="language-select"
        width="30px"
      />
      <TemplateCheckbox />
    </Grid>
  );
};

export default Settings;
