import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

export interface RootState {
  // define your root state properties here
}

export type RootActions =
  | Action<any>
  | ThunkAction<void, RootState, undefined, any>;
