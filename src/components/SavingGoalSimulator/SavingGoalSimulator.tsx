import * as React from 'react';
import './SavingGoalSimulator.scss';
import { useIntl } from 'react-intl';
import { Card } from '../common/Card';
import icon from '../../icons/academy.svg';
import { MoneyField } from '../common/MoneyField';
import { DateField } from '../common/DateField';

export const SavingGoalSimulator: React.FC = () => {
  const {
    messages: {
      appTitle1,
      appTitle2,
      buyTitle,
      buySubtitle,
      totalAmount,
      reachGoalBy
    }
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
        <p className="caption">{buySubtitle}</p>
        <div className="fieldsContainer">
          <MoneyField label={totalAmount as string} />
          <DateField
            label={reachGoalBy as string}
            startDate={new Date()}
            minimumDate={new Date()}
          />
        </div>
      </Card>
    </section>
  );
};
