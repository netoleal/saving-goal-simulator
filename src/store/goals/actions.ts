import { Goal } from 'mock/goal-types';
import { GoalSetup } from 'store/reducers/goalsReducer';

export const GoalsActions = {
  SETUP_GOAL: 'SETUP_GOAL'
};

export const setupGoal = (goal: Goal, setup: GoalSetup) => {
  return { type: GoalsActions.SETUP_GOAL, payload: { goal, setup } };
};
