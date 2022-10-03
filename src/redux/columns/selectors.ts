import { RootState } from "redux/store";

export const selectColumns = (state: RootState) => state.columns.columns;
