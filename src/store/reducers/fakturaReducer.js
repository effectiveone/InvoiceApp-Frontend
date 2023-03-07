import {
  CREATE_FAKTURA_SUCCESS,
  READ_FAKTURA_SUCCESS,
  EDIT_FAKTURA_SUCCESS,
} from "../actions/fakturaActions";

const initialState = {
  fakturaData: [],
};

const fakturaReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FAKTURA_SUCCESS:
      return {
        ...state,
        fakturaData: action.payload,
      };
    case READ_FAKTURA_SUCCESS:
      return {
        fakturaData: action.payload,
      };
    case EDIT_FAKTURA_SUCCESS:
      return {
        ...state,
        fakturaData: action.payload,
      };
    default:
      return state;
  }
};

export default fakturaReducer;
