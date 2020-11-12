import React from 'react';
import { useSelector } from 'react-redux';
import { GoalSelectorGridComponent } from './GoalSelectorGrid.component';
import { getGoals, getSetup } from '../../store/goals/selectors';

export const GoalSelectorGrid: React.FC = () => {
  const goals = useSelector(getGoals);
  const setups = useSelector(getSetup);

  return <GoalSelectorGridComponent goals={goals} setups={setups} />;
};
