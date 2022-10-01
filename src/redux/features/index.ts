import { combineReducers } from 'redux';
import cardsSlice from './cards/cardsSlice';
import usernameSlice from './username/usernameSlice';

const rootReducer = combineReducers({
  cards: cardsSlice,
  username: usernameSlice,
});

export default rootReducer;
