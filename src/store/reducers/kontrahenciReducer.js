import {
  GET_CONTRACTOR_DATA,
  ADD_CONTRACTOR_DATA,
  UPDATE_CONTRACTOR_DATA,
  UPDATE_CONTRACTOR_DATA_SUCCESS,
  UPDATE_CONTRACTOR_DATA_FAILURE,
} from "../actions/kontrahenciActions";

const initialState = {
  contractorData: [],
  loading: false,
  error: null,
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
    case UPDATE_CONTRACTOR_DATA:
      return { ...state, loading: true };
    case UPDATE_CONTRACTOR_DATA_SUCCESS:
      return { ...state, contractorData: action.payload, loading: false };
    case UPDATE_CONTRACTOR_DATA_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default contractorReducer;
