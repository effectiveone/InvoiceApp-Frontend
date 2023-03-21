import { ThunkAction } from "redux-thunk";
import { RootState, RootActions } from "./types";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  RootActions
>;
