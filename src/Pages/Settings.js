import React from "react";
import Layout from "../shared/components/layout/layout";
import { useSelector, useDispatch } from "react-redux";
import { setTheme, changeTheme } from "../store/actions/designActions";

const Settings = () => {
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
    <select value={selectedDesign?.name} onChange={handleThemeChange}>
      {mySystemOfDesign?.map((design) => (
        <option key={design.name} value={design.name}>
          {design.name}
        </option>
      ))}
    </select>
  );
};

export default Layout(Settings);
