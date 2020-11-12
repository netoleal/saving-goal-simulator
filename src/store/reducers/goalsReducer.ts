type GoalSetup = {
  totalGoalValue: number;
  targetDate: Date;
};

export type GoalsInitialStateType = {
  items: { id: string; setup: GoalSetup }[];
};

export const GoalsInitialState: GoalsInitialStateType = {
  items: []
};

export function goalsReducer(state = GoalsInitialState, action = {}) {
  return state;
}
