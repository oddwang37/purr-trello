import { combineReducers } from "redux";
import usernameSlice from "./username/usernameSlice";
import { columnsSlice } from "../columns/slices";
import { cardsDuckSlice } from "../cards/slices";
import cardsSlice from "./cards/cardsSlice";

const rootReducer = combineReducers({
  user: usernameSlice,
  cards: cardsSlice,
  cardsDuck: cardsDuckSlice.reducer,
  columns: columnsSlice.reducer,
});

export default rootReducer;
