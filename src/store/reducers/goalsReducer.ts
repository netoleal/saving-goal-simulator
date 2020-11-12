import goalsData from '../../mock/goal-types';
import { GoalsActions } from '../goals/actions';

export type GoalSetup = {
  totalGoalValue: number;
  targetDate: Date;
};

export type GoalsInitialStateType = {
  items: { id: string; setup: GoalSetup }[];
  goals: typeof goalsData;
};

export const GoalsInitialState: GoalsInitialStateType = {
  items: [],
  goals: goalsData
};

type Action = {
  type: string;
  payload?: any;
};

const cleanAction = { type: '' };

export function goalsReducer(
  state = GoalsInitialState,
  action: Action = cleanAction
) {
  switch (action.type) {
    case GoalsActions.SETUP_GOAL: {
      const itemsWithoutGoal = state.items.filter(
        item => item.id !== action.payload.goal.id
      );
      const newItem = {
        id: action.payload.goal.id,
        setup: action.payload.setup
      };
      return { ...state, items: [...itemsWithoutGoal, newItem] };
    }
    default:
      return state;
  }
}
