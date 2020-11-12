import React from 'react';
import './GoalSelectorGrid.component.scss';
import { Goal } from '../../mock/goal-types';
import { GoalCard } from '../GoalCard';
import { GoalSetup } from '../../store/reducers/goalsReducer';

export type GoalSelectorGridComponentProps = {
  goals: Goal[];
  setups: { id: string; setup: GoalSetup }[];
};

export const GoalSelectorGridComponent: React.FC<GoalSelectorGridComponentProps> = ({
  goals,
  setups
}) => {
  const setupHash: { [x: string]: GoalSetup } = {};
  setups.forEach(item => (setupHash[item.id] = item.setup));
  return (
    <div className="goalSelectorGrid">
      {goals.map(goal => (
        <GoalCard key={goal.id} goal={goal} setup={setupHash[goal.id]} />
      ))}
    </div>
  );
};
