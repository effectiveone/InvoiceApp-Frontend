import {
  GET_CONTRACTOR_DATA,
  ADD_CONTRACTOR_DATA,
} from "../actions/kontrahenciActions";

const initialState = {
  contractorData: [],
};

const contractorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTRACTOR_DATA:
      return {
        ...state,
        contractorData: action.payload,
      };
    case ADD_CONTRACTOR_DATA:
      return {
        ...state,
        contractorData: action.payload,
      };
    default:
      return state;
  }
};

export default contractorReducer;
