import { RootState } from '../types';

export function getGoals(state: RootState) {
  return state.goals.goals;
}

export function getSetup(state: RootState) {
  return state.goals.items;
}
