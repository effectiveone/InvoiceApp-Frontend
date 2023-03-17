import { createTheme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useTheme = () => {
  const selectedDesign = useSelector((state) => state.design.selectedDesign);

  const theme = createTheme({
    palette: {
      primary: {
        main: selectedDesign.primaryColor,
      },
      secondary: {
        main: selectedDesign.secondaryColor,
      },
      text: {
        primary: selectedDesign.textColor,
      },
      background: {
        default: selectedDesign.backgroundColor,
      },
    },
  });

  return theme;
};

export default useTheme;
