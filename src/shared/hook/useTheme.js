import { createTheme } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setTheme } from "../../store/actions/designActions";

const useTheme = () => {
  const mySystemOfDesign = useSelector(
    (state) => state.design.mySystemOfDesign
  );
  const selectedDesign = useSelector((state) => state.design.selectedDesign);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(setTheme(selectedDesign));
  // }, [dispatch, selectedDesign]);

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
