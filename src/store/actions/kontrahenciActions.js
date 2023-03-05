import axios from "axios";
import { openAlertMessage } from "./alertActions";

export const GET_CONTRACTOR_DATA = "GET_CONTRACTOR_DATA";
export const ADD_CONTRACTOR_DATA = "ADD_CONTRACTOR_DATA";

export const getContractorData = (user) => {
  console.log("getContractorData", user);
  if (!user) return;
  const { mail, token } = user;
  console.log("getContractorDatamail", mail);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return (dispatch) => {
    axios
      .post("http://localhost:5002/api/auth/get-kontrahenci", {
        userEmail: mail,
      })
      .then((response) => {
        dispatch({
          type: GET_CONTRACTOR_DATA,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addContractorData = (newData, user) => async (dispatch) => {
  if (!user) return;
  const { token } = user;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const res = await axios.post(
      "http://localhost:5002/api/auth/kontrahenci",
      newData
    );
    dispatch({
      type: ADD_CONTRACTOR_DATA,
      payload: res.data,
    });
    dispatch(openAlertMessage("Task added successfully!"));
  } catch (err) {
    dispatch(openAlertMessage("Error adding task: " + err));
  }
};
