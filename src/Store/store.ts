import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import authReducer from "./reducers/authReducer";
import alertReducer from "./reducers/alertReducer";
import { companyReducer } from "./reducers/mycompanyReducer";
import contractorReducer from "./reducers/kontrahenciReducer";
import fakturaReducer from "./reducers/fakturaReducer";
import { designReducer } from "./reducers/designReducer";
import templateReducer from "./reducers/templateReducer";
import { AuthState } from "./reducers/authReducer";
import { AlertState } from "./reducers/alertReducer";
import { CompanyState } from "./reducers/mycompanyReducer";
import { ContractorState } from "./reducers/kontrahenciReducer";
import { FakturaState } from "./reducers/fakturaReducer";
import { DesignState } from "./reducers/designReducer";
import TemplateState from "./reducers/templateReducer";

export interface RootState {
  template: TemplateState;
  design: DesignState;
  faktura: FakturaState;
  kontrahenci: ContractorState;
  myCompany: CompanyState;
  auth: AuthState;
  alert: AlertState;
}

const rootReducer = combineReducers<RootState>({
  template: templateReducer,
  design: designReducer,
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
