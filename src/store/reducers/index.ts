import { combineReducers } from 'redux';
import { goalsReducer } from './goalsReducer';

export const rootReducer = combineReducers({
  goals: goalsReducer
});
