import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTheme, changeTheme } from "../../Store/actions/designActions";
import { US, PL, FR } from "country-flag-icons/react/3x2";
import i18n from "../../i18n";

export const useSettings = () => {
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

  // Custom
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    value: "en",
    icon: <US />,
  });

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  return {
    language,
    setLanguage,
    options,
    mySystemOfDesign,
    handleThemeChange,
    selectedDesign,
    handleChange,
    isOpen,
    setIsOpen,
    selectedOption,
    setSelectedOption,
    toggleOptions,
  };
};
