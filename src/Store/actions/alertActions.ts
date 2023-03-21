import { useDispatch } from "react-redux";

export interface AlertActions {
  OPEN_ALERT_MESSAGE: "ALERT.OPEN_ALERT_MESSAGE";
  CLOSE_ALERT_MESSAGE: "ALERT.CLOSE_ALERT_MESSAGE";
}

export const alertActions: AlertActions = {
  OPEN_ALERT_MESSAGE: "ALERT.OPEN_ALERT_MESSAGE",
  CLOSE_ALERT_MESSAGE: "ALERT.CLOSE_ALERT_MESSAGE",
};

type OpenAlertMessageAction = {
  type: typeof alertActions.OPEN_ALERT_MESSAGE;
  content: string;
};

type CloseAlertMessageAction = {
  type: typeof alertActions.CLOSE_ALERT_MESSAGE;
};

export type AlertAction = OpenAlertMessageAction | CloseAlertMessageAction;

export const openAlertMessage = (content: string): AlertAction => {
  return {
    type: alertActions.OPEN_ALERT_MESSAGE,
    content,
  };
};

export const closeAlertMessage = (): AlertAction => {
  return {
    type: alertActions.CLOSE_ALERT_MESSAGE,
  };
};

export const getActions = () => {
  return {
    openAlertMessage: (content: string) => dispatch(openAlertMessage(content)),
    closeAlertMessage: () => dispatch(closeAlertMessage()),
  };
};

export default alertActions;
