import {
  GET_COMPANY_DATA,
  UPDATE_COMPANY_DATA,
  DELETE_COMPANY_DATA,
  ADD_COMPANY_DATA,
} from "../actions/mycompanyActions";
import { CompanyData } from "../types";

interface CompanyState {
  companyData: CompanyData;
}

const initialState: CompanyState = {
  companyData: {},
};

export const companyReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_COMPANY_DATA:
      return {
        ...state,
        companyData: action.payload,
      };
    case UPDATE_COMPANY_DATA:
      return {
        ...state,
        companyData: action.payload,
      };
    case DELETE_COMPANY_DATA:
      return {
        ...state,
        companyData: {},
      };
    case ADD_COMPANY_DATA:
      return {
        ...state,
        companyData: action.payload,
      };
    default:
      return state;
  }
};
