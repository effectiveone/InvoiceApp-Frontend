import axios from "axios";

export const GET_COMPANY_DATA = "GET_COMPANY_DATA";
export const UPDATE_COMPANY_DATA = "UPDATE_COMPANY_DATA";
export const DELETE_COMPANY_DATA = "DELETE_COMPANY_DATA";
export const ADD_COMPANY_DATA = "ADD_COMPANY_DATA";

export const getCompanyData = (user) => {
  if (!user) return;
  const { mail, token } = user;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return (dispatch) => {
    axios
      .patch("http://localhost:5002/api/auth/dane-firmy", mail)
      .then((response) => {
        dispatch({
          type: GET_COMPANY_DATA,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updateCompanyData = (updatedData, user) => {
  if (!user) return;
  const { mail, token } = user;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return (dispatch) => {
    axios
      .patch("http://localhost:5002/api/auth/dane-firmy", {
        mail,
        ...updatedData,
      })
      .then((response) => {
        dispatch({
          type: UPDATE_COMPANY_DATA,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteCompanyData = (user) => {
  if (!user) return;
  const { token } = user;

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return (dispatch) => {
    axios
      .delete("http://localhost:5002/api/auth/dane-firmy")
      .then(() => {
        dispatch({
          type: DELETE_COMPANY_DATA,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addCompanyData = (newData, user) => {
  if (!user) return;
  const { mail, token } = user;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return (dispatch) => {
    axios
      .post("http://localhost:5002/api/auth/dane-firmy", {
        mail,
        ...newData,
      })
      .then((response) => {
        dispatch({
          type: ADD_COMPANY_DATA,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
