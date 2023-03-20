import { AuthActionTypes, AuthState } from "../types/authTypes";
import { authActions } from "../actions/authActions";

const initState: AuthState = {
  userDetails: null,
};

const reducer = (state = initState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case authActions.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.userDetails,
      };
    default:
      return state;
  }
};

export default reducer;
