import { CHANGE_THEME } from "../actions/designActions";

export const initialState = {
  mySystemOfDesign: [
    {
      name: "Material Oceanic",
      primaryColor: "#80CBC4",
      secondaryColor: "#FFAB40",
      textColor: "#CDD3DE",
      backgroundColor: "#1B2B34",
    },
    {
      name: "Material Darker",
      primaryColor: "#82B1FF",
      secondaryColor: "#FF9D76",
      textColor: "#E0E0E0",
      backgroundColor: "#263238",
    },
    {
      name: "Material Lighter",
      primaryColor: "#2979FF",
      secondaryColor: "#FF6D00",
      textColor: "#546E7A",
      backgroundColor: "#F5F5F5",
    },
    {
      name: "Material Palenight",
      primaryColor: "#82AAFF",
      secondaryColor: "#89DDFF",
      textColor: "#B7C5D3",
      backgroundColor: "#292D3E",
    },
    {
      name: "Material Deep Ocean",
      primaryColor: "#82B1FF",
      secondaryColor: "#80CBC4",
      textColor: "#CDD3DE",
      backgroundColor: "#0D1F2D",
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
