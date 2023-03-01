import React from "react";
import PermanentDrawer from "./drawer";

const layout = (WrappedComponent) => {
  return function WithPermanentDrawer(props) {
    return (
      <>
        <PermanentDrawer>
          <WrappedComponent {...props} />
        </PermanentDrawer>
      </>
    );
  };
};

export default layout;
