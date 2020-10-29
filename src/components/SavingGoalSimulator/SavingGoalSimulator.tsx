import * as React from 'react';
import './SavingGoalSimulator.scss';
import { useIntl } from 'react-intl';
import { Card } from '../common/Card';
import icon from '../../icons/academy.svg';

export const SavingGoalSimulator: React.FC = () => {
  const {
    messages: { appTitle1, appTitle2, buyTitle }
  } = useIntl();
  return (
    <section className="SavingGoalSimulator">
      <h2>
        {appTitle1}
        <span>{appTitle2}</span>
      </h2>
      <Card className="contentCard">
        <img src={icon} alt="Academy icon" />
        <h1>{buyTitle}</h1>
      </Card>
    </section>
  );
};
