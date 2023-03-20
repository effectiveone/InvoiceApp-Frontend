import * as api from "../../Shared/Utils/api";
import { openAlertMessage } from "./alertActions";
import axios from "axios";
import { Dispatch } from "redux";
import { useNavigate } from "react-router-dom";

export const authActions = {
  SET_USER_DETAILS: "AUTH.SET_USER_DETAILS",
};

export const getActions = (dispatch: Dispatch) => {
  return {
    logout: () => dispatch(logout()),
    login: (
      userDetails: { mail: string; password: string },
      history: ReturnType<typeof useNavigate>
    ) => dispatch(login(userDetails, history)),
    register: (
      userDetails: { mail: string; password: string; username: string },
      history: ReturnType<typeof useHistory>
    ) => dispatch(register(userDetails, history)),
  };
};

const logout = () => {
  return async (dispatch: Dispatch) => {
    localStorage.removeItem("user");

    dispatch(setUserDetails(null));

    try {
      await axios.delete("http://localhost:5002/api/auth/logout");
    } catch (error) {
      console.error(error);
    }
  };
};

const setUserDetails = (userDetails: any) => {
  return {
    type: authActions.SET_USER_DETAILS,
    userDetails,
  };
};

const login = (
  userDetails: { mail: string; password: string },
  history: ReturnType<typeof useHistory>
) => {
  return (dispatch: Dispatch) => {
    api
      .login(userDetails)
      .then((response) => {
        console.log(response);
        if (response.error) {
          dispatch(openAlertMessage(response?.exception?.response?.data));
        } else {
          const { userDetails } = response?.data;
          localStorage.setItem("user", JSON.stringify(userDetails));

          dispatch(setUserDetails(userDetails));
          history("/InvoicesIssued");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

const register = (
  userDetails: { mail: string; password: string; username: string },
  history: ReturnType<typeof useNavigate>
) => {
  return (dispatch: Dispatch) => {
    api
      .register(userDetails)
      .then((response) => {
        console.log(response);
        if (response.error) {
          dispatch(openAlertMessage(response?.exception?.response?.data));
        } else {
          const { userDetails } = response?.data;
          localStorage.setItem("user", JSON.stringify(userDetails));

          dispatch(setUserDetails(userDetails));
          history("/InvoicesIssued");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
