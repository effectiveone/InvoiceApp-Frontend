import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTheme, changeTheme } from "../../Store/actions/designActions";
import { US, PL, FR } from "country-flag-icons/react/3x2";
import i18n from "../../i18n";
import { DesignState } from "../../Store/types/designTypes";

interface Option {
  value: string;
  icon: JSX.Element;
}

interface SettingsState {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  options: Option[];
  mySystemOfDesign: DesignState["mySystemOfDesign"];
  handleThemeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedDesign: DesignState["selectedDesign"];
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOption: Option;
  setSelectedOption: React.Dispatch<React.SetStateAction<Option>>;
  toggleOptions: () => void;
}

export const useSettings = (): SettingsState => {
  const [language, setLanguage] = useState("en");
  const options: Option[] = [
    { value: "en", icon: <US /> },
    { value: "pl", icon: <PL /> },
    { value: "fr", icon: <FR /> },
  ];

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const mySystemOfDesign = useSelector(
    (state: { design: DesignState }) => state.design.mySystemOfDesign
  );
  const selectedDesign = useSelector(
    (state: { design: DesignState }) => state.design.selectedDesign
  );

  const dispatch = useDispatch();

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    dispatch(changeTheme(value));
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDesign = mySystemOfDesign.find(
      (design) => design.name === event.target.value
    );
    dispatch(setTheme(selectedDesign));
  };

  // Custom
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option>({
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
