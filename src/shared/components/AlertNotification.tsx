import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../Store";
import { getActions } from "../../Store/actions/alertActions";

const AlertNotification: React.FC<ConnectedProps<typeof connector>> = ({
  showAlertMessage,
  closeAlertMessage,
  alertMessageContent,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={showAlertMessage}
      onClose={closeAlertMessage}
      autoHideDuration={6000}
    >
      <Alert severity="info">{alertMessageContent}</Alert>
    </Snackbar>
  );
};

const mapStoreStateToProps = (state: RootState) => {
  return {
    ...state.alert,
  };
};

const connector = connect(mapStoreStateToProps, getActions);

export default connector(AlertNotification);
