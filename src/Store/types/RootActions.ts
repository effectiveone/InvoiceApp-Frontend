import { CompanyActionTypes } from "../actions/companyActions";
import { UserActionTypes } from "../actions/userActions";

type RootActions = CompanyActionTypes | UserActionTypes;

export default RootActions;
