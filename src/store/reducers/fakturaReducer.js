import {
  CREATE_FAKTURA_REQUEST,
  CREATE_FAKTURA_SUCCESS,
  CREATE_FAKTURA_FAILURE,
  READ_FAKTURA_REQUEST,
  READ_FAKTURA_SUCCESS,
  READ_FAKTURA_FAILURE,
} from "../actions/fakturaActions";

const initialState = {
  creatingFaktura: false,
  createdFaktura: null,
  createFakturaError: null,
  readingFaktura: false,
  readFakturaData: null,
  readFakturaError: null,
};

export default function fakturaReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_FAKTURA_REQUEST:
      return {
        ...state,
        creatingFaktura: true,
        createdFaktura: null,
        createFakturaError: null,
      };
    case CREATE_FAKTURA_SUCCESS:
      return {
        ...state,
        creatingFaktura: false,
        createdFaktura: action.payload,
        createFakturaError: null,
      };
    case CREATE_FAKTURA_FAILURE:
      return {
        ...state,
        creatingFaktura: false,
        createdFaktura: null,
        createFakturaError: action.error,
      };
    case READ_FAKTURA_REQUEST:
      return {
        ...state,
        readingFaktura: true,
        faktura: null,
        error: null,
      };
    case READ_FAKTURA_SUCCESS:
      return {
        ...state,
        readingFaktura: false,
        faktura: action.payload,
        error: null,
      };
    case READ_FAKTURA_FAILURE:
      return {
        ...state,
        readingFaktura: false,
        faktura: null,
        error: action.payload,
      };
    case CREATE_FAKTURA_REQUEST:
      return {
        ...state,
        creatingFaktura: true,
        error: null,
      };
    case CREATE_FAKTURA_SUCCESS:
      return {
        ...state,
        creatingFaktura: false,
        faktura: action.payload,
        error: null,
      };
    case CREATE_FAKTURA_FAILURE:
      return {
        ...state,
        creatingFaktura: false,
        faktura: null,
        error: action.payload,
      };
    default:
      return state;
  }
}
