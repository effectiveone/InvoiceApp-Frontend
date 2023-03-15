import { initialState } from "../reducers/designReducer";
export const SET_THEME = "SET_THEME";
export const CHANGE_THEME = "CHANGE_THEME";
const { mySystemOfDesign } = initialState;
export const changeTheme = (themeName) => {
  const theme = mySystemOfDesign.find((theme) => theme.name === themeName);
  return {
    type: CHANGE_THEME,
    payload: theme,
  };
};

export const setTheme = (theme) => {
  return {
    type: "SET_THEME",
    payload: theme,
  };
};
