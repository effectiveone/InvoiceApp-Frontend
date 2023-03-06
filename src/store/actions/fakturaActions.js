import axios from "axios";
import { openAlertMessage } from "./alertActions";

export const CREATE_FAKTURA_REQUEST = "CREATE_FAKTURA_REQUEST";
export const CREATE_FAKTURA_SUCCESS = "CREATE_FAKTURA_SUCCESS";
export const CREATE_FAKTURA_FAILURE = "CREATE_FAKTURA_FAILURE";
export const READ_FAKTURA_REQUEST = "READ_FAKTURA_REQUEST";
export const READ_FAKTURA_SUCCESS = "READ_FAKTURA_SUCCESS";
export const READ_FAKTURA_FAILURE = "READ_FAKTURA_FAILURE";

export const createFaktura = (faktura, user) => async (dispatch) => {

  if (!user) return;
  const { token } = user;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  dispatch({ type: CREATE_FAKTURA_REQUEST });
  try {
    const res = await axios.post("http://localhost:5002/api/auth/faktury", faktura);
    dispatch({
      type: CREATE_FAKTURA_SUCCESS,
      payload: res.data,
    });
    dispatch(openAlertMessage("Faktura created successfully!"));
  } catch (err) {
    dispatch({
      type: CREATE_FAKTURA_FAILURE,
      error: err.message,
    });
    dispatch(openAlertMessage("Error creating faktura: " + err.message));
  }
};

export const readFaktura = (id, user) => async (dispatch) => {
  if (!user) return;
  const { token } = user;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  dispatch({ type: READ_FAKTURA_REQUEST });
  try {
    const res = await axios.get(`http://localhost:5002/api/auth/faktury/${id}`);
    dispatch({
      type: READ_FAKTURA_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: READ_FAKTURA_FAILURE,
      error: err.message,
    });
    dispatch(openAlertMessage("Error reading faktura: " + err.message));
  }
};
