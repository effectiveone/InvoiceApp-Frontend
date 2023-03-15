import { SET_THEME, CHANGE_THEME } from "../actions/designActions";

export const initialState = {
  mySystemOfDesign: [
    {
      name: "darkmode",
      primaryColor: "#29B6F6",
      secondaryColor: "#8BC34A",
      textColor: "#FFFFFF",
      backgroundColor: "#263238",
    },
    {
      name: "lightmode",
      primaryColor: "#1976D2",
      secondaryColor: "#FFA726",
      textColor: "#424242",
      backgroundColor: "#FFFFFF",
    },
    {
      name: "Ocean",
      primaryColor: "#008CBA",
      secondaryColor: "#00BCD4",
      textColor: "#FFFFFF",
      backgroundColor: "#37474F",
    },
    {
      name: "Palenight",
      primaryColor: "#9C27B0",
      secondaryColor: "#FFEB3B",
      textColor: "#FFFFFF",

      backgroundColor: "#292D3E",
    },
  ],
  selectedDesign: {
    name: "darkmode",
    primaryColor: "#29B6F6",
    secondaryColor: "#8BC34A",
    textColor: "#424242",
    backgroundColor: "#263238",
  },
};

export const designReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DESIGN":
      return {
        ...state,
        selectedDesign: action.payload,
      };
    case CHANGE_THEME:
      return {
        ...state,
        selectedDesign: action.payload,
      };
    default:
      return state;
  }
};
