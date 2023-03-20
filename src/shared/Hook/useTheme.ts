import { createTheme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";

const useTheme = () => {
  const selectedDesign = useSelector(
    (state: RootState) => state.design.selectedDesign
  );

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
