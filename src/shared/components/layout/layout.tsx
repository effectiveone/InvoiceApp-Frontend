import React from "react";
import PermanentDrawer from "./drawer";
import Navbar from "./Navbar";
import useTheme from "../../Hook/useTheme";
import { ThemeProvider } from "@material-ui/core/styles";

interface LayoutProps {
  [key: string]: any;
}

const layout = (WrappedComponent: React.FC<LayoutProps>) => {
  return function WithPermanentDrawer(props: LayoutProps) {
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
