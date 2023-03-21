import React from "react";
import PermanentDrawer from "./drawer";
import Navbar from "./Navbar";
import useTheme from "../../Hook/useTheme";
import { ThemeProvider } from "@material-ui/core/styles";

const layout = (WrappedComponent) => {
  return function WithPermanentDrawer(props) {
    const theme = useTheme();

    return (
      <>
        <ThemeProvider theme={theme}>
          <Navbar />
          <PermanentDrawer>
            <WrappedComponent {...props} />
          </PermanentDrawer>
        </ThemeProvider>
      </>
    );
  };
};

export default layout;
