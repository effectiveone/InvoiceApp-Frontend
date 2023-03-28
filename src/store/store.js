import { composeWithDevTools } from "redux-devtools-extension";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import alertReducer from "./reducers/alertReducer";
import { companyReducer } from "./reducers/mycompanyReducer";
import contractorReducer from "./reducers/kontrahenciReducer";
import fakturaReducer from "./reducers/fakturaReducer";
import { templateReducer } from "./reducers/templateReducer";
import settingsReducer from "./reducers/settingsReducer";
import { productReducer } from "./reducers/productReducer";
import statsReducer from "./reducers/statsReducer";

const rootReducer = combineReducers({
  stats: statsReducer,
  products: productReducer,
  settings: settingsReducer,
  template: templateReducer,
  faktura: fakturaReducer,
  kontrahenci: contractorReducer,
  myCompany: companyReducer,
  auth: authReducer,
  alert: alertReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
