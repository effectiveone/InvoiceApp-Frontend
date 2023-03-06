import {
  CREATE_FAKTURA_REQUEST,
  CREATE_FAKTURA_SUCCESS,
  CREATE_FAKTURA_FAILURE,
} from "../actions/fakturaActions";

const initialState = {
  fakturaData: null,
};

const fakturaReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FAKTURA_SUCCESS:
      return {
        ...state,
        fakturaData: action.payload,
      };
    default:
      return state;
  }
};

export default fakturaReducer;
