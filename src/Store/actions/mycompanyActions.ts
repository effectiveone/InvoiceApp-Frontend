import axios, { AxiosError } from "axios";
import { openAlertMessage } from "./alertActions";
import { AppThunk } from "../store";

export const GET_COMPANY_DATA = "GET_COMPANY_DATA";
export const UPDATE_COMPANY_DATA = "UPDATE_COMPANY_DATA";
export const DELETE_COMPANY_DATA = "DELETE_COMPANY_DATA";
export const ADD_COMPANY_DATA = "ADD_COMPANY_DATA";

interface CompanyData {
  [key: string]: any;
}

interface GetCompanyDataAction {
  type: typeof GET_COMPANY_DATA;
  payload: CompanyData;
}

interface AddCompanyDataAction {
  type: typeof ADD_COMPANY_DATA;
  payload: CompanyData;
}

interface UpdateCompanyDataAction {
  type: typeof UPDATE_COMPANY_DATA;
  payload: CompanyData;
}

interface DeleteCompanyDataAction {
  type: typeof DELETE_COMPANY_DATA;
}

export type CompanyActionTypes =
  | GetCompanyDataAction
  | AddCompanyDataAction
  | UpdateCompanyDataAction
  | DeleteCompanyDataAction;

export const getCompanyData = (user: any): AppThunk => {
  if (!user) return () => {};
  const { mail, token } = user;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return (dispatch) => {
    axios
      .post("http://localhost:5002/api/auth/get-dane-firmy", {
        userEmail: mail,
      })
      .then((response) => {
        dispatch({
          type: GET_COMPANY_DATA,
          payload: response.data,
        });
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };
};

export const addCompanyData =
  (newData: CompanyData, user: any): AppThunk =>
  async (dispatch) => {
    if (!user) return;
    const { token, mail } = user;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const res = await axios.put("http://localhost:5002/api/auth/dane-firmy", {
        ...newData,
        userEmail: mail,
      });
      dispatch({
        type: ADD_COMPANY_DATA,
        payload: res.data,
      });
      dispatch(openAlertMessage("Task added successfully!"));
    } catch (err) {
      dispatch(openAlertMessage("Error adding task: " + err));
    }
  };

export const updateCompanyData = (
  updatedData: CompanyData,
  user: any
): AppThunk => {
  if (!user) return () => {};
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
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };
};

export const deleteCompanyData = (user: any): AppThunk => {
  if (!user) return () => {};
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
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };
};
