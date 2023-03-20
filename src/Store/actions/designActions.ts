import { initialState } from "../reducers/designReducer";
import { SystemOfDesign, DesignState } from "../types/designTypes";

export const SET_THEME = "SET_THEME";
export const CHANGE_THEME = "CHANGE_THEME";

const { mySystemOfDesign } = initialState;

export const changeTheme = (themeName: string) => {
  const theme: SystemOfDesign | undefined = mySystemOfDesign.find(
    (theme) => theme.name === themeName
  );
  if (!theme) {
    throw new Error(`Theme ${themeName} not found`);
  }
  return {
    type: CHANGE_THEME,
    payload: theme,
  };
};

export const setTheme = (theme: SystemOfDesign) => {
  return {
    type: SET_THEME,
    payload: theme,
  };
};
