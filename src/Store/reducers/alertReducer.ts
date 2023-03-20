import { Reducer } from "redux";
import alertActions from "../actions/alertActions";

interface AlertState {
  showAlertMessage: boolean;
  alertMessageContent: string | null;
}

const initState: AlertState = {
  showAlertMessage: false,
  alertMessageContent: null,
};

const reducer: Reducer<AlertState, any> = (state = initState, action) => {
  switch (action.type) {
    case alertActions.OPEN_ALERT_MESSAGE:
      return {
        ...state,
        showAlertMessage: true,
        alertMessageContent: action.content,
      };
    case alertActions.CLOSE_ALERT_MESSAGE:
      return {
        ...state,
        showAlertMessage: false,
        alertMessageContent: null,
      };
    default:
      return state;
  }
};

export default reducer;
