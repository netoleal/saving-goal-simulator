import React from 'react';
import { Goal } from '../../mock/goal-types';
import { GoalSetup } from '../../store/reducers/goalsReducer';
import { FormattedMessage, useIntl } from 'react-intl';
import { Card } from '../common/Card';
import { Link } from 'react-router-dom';
import './GoalCard.component.scss';

export type GoalCardProps = {
  goal: Goal;
  setup?: GoalSetup;
};

export const GoalCard: React.FC<GoalCardProps> = ({ goal, setup }) => {
  const {
    messages: {
      goals: goalsIntl,
      landing: { startSetup }
    }
  } = useIntl();

  return (
    <Card className="goalCard">
      <img src={goal.icon} alt={goal.title} />
      <span className="goalTitle">{goalsIntl[goal.title as any]}</span>
      {!!setup && (
        <div className="resultBox">
          <Link to={`/setup/${goal.id}`}>
            <p className="targetValue">
              <FormattedMessage
                id="amountValue"
                values={{
                  value: setup.totalGoalValue
                }}
              />
            </p>
            <p className="reachLabel">
              <FormattedMessage id="reachGoalBy" />
            </p>
            <p className="targetDate">
              <FormattedMessage
                id="shortDate"
                values={{
                  value: setup.targetDate
                }}
              />
            </p>
          </Link>
        </div>
      )}
      {!setup && (
        <Link className="button" to={`/setup/${goal.id}`}>
          {startSetup}
        </Link>
      )}
    </Card>
  );
};
