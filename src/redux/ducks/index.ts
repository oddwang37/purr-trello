import { combineReducers } from 'redux';
import usernameReducer from './username/slices';
import columnsReducer from './columns/slices';
import cardsReducer from './cards/slices';
import popupCardReducer from './popupCard/slices';

const rootReducer = combineReducers({
  user: usernameReducer,
  cards: cardsReducer,
  columns: columnsReducer,
  popupCard: popupCardReducer,
});

export default rootReducer;
