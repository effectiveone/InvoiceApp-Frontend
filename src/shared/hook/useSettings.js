import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTheme, changeTheme } from "../../Store/actions/designActions";
import { useUser } from "./useUser";
import {
  updateSettings,
  getSettings,
} from "../../Store/actions/settingsActions";

import { US, PL, FR } from "country-flag-icons/react/3x2";
import i18n from "../../i18n";

export const useSettings = () => {
  const { currentUser } = useUser();
  const settings = useSelector((state) => state.settings.settings);
  const selectedSettings = settings?.lang;

  const [language, setLanguage] = useState(selectedSettings ?? "en");
  const options = [
    { value: "en", icon: <US /> },
    { value: "pl", icon: <PL /> },
    { value: "fr", icon: <FR /> },
  ];

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, setLanguage]);

  const mySystemOfDesign = useSelector(
    (state) => state.settings.mySystemOfDesign
  );

  const selectedDesign = settings?.designName;
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(getSettings(currentUser));
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    setLanguage(selectedSettings ?? "en");
  }, [selectedSettings]);

  const handleThemeChange = (event) => {
    const { value } = event.target;
    dispatch(
      updateSettings(
        {
          designName: value,
          email: currentUser.mail,
        },
        currentUser
      )
    );
  };

  const handleChange = (e) => {
    const selectedDesign = mySystemOfDesign.find(
      (design) => design.name === e.target.value
    );
    dispatch(
      updateSettings(
        {
          designName: selectedDesign.name,
          email: currentUser.mail,
        },
        currentUser
      )
    );
  };

  const handleLang = (e) => {
    dispatch(
      updateSettings(
        {
          lang: e,
          email: currentUser.mail,
        },
        currentUser
      )
    );
  };

  // Custom
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    value: "en",
    icon: <US />,
  });

  useEffect(() => {
    const selectedLang = options?.find((p) => p.value === selectedSettings);
    setSelectedOption(selectedLang);
  }, [dispatch, selectedSettings]);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  return {
    handleLang,
    language,
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
