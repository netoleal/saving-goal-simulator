import * as React from 'react';
import './SavingGoalSimulator.scss';
import { useIntl, FormattedMessage } from 'react-intl';
import { Card } from '../common/Card';
import icon from '../../icons/academy.svg';
import { MoneyField } from '../common/MoneyField';
import { DateField } from '../common/DateField';
import {
  useSavingGoalCalculator,
  SavingGoalCalculatorResult
} from '../../hooks/useSavingGoalCalculator';
import { useSelectedGoal } from '../../hooks/useSelectedGoal';
import { useDispatch } from 'react-redux';
import { setupGoal } from '../../store/goals/actions';
import { useHistory } from 'react-router-dom';

export const SavingGoalSimulator: React.FC = () => {
  const {
    messages: {
      appTitle1,
      appTitle2,
      buyTitle,
      buySubtitle,
      totalAmount,
      totalPlaceholder,
      reachGoalBy,
      monthlyAmount,
      confirm,
      goals: goalsIntl
    },
    formatMessage
  } = useIntl();
  const [result, setResult] = React.useState<SavingGoalCalculatorResult>({
    deposits: 0,
    monthlyAmount: 0
  });
  const { selected, setup } = useSelectedGoal();
  const [goal, setGoal] = React.useState(setup?.totalGoalValue ?? 20000);
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 12);
  const [targetDate, setTargetDate] = React.useState(
    setup?.targetDate ?? nextMonth
  );
  const calculateGoalResult = useSavingGoalCalculator();
  const dispatch = useDispatch();
  const history = useHistory();

  function handleDateChange(date: Date) {
    setTargetDate(date);
  }
  function handleValueChange(value: number) {
    setGoal(value);
  }

  function submit() {
    dispatch(setupGoal(selected, { totalGoalValue: goal, targetDate }));
    history.push('/');
  }

  React.useEffect(() => {
    setResult(calculateGoalResult(goal, targetDate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goal, targetDate]);
  return (
    <section className="SavingGoalSimulator">
      <h2>
        {appTitle1}
        <span>{appTitle2}</span>
      </h2>
      <Card className="contentCard">
        <img src={selected.icon} alt={selected.title} />
        <h1>{goalsIntl[selected.title as any]}</h1>
        <p className="caption">{buySubtitle}</p>
        <div className="fieldsContainer">
          <MoneyField
            label={totalAmount as string}
            startValue={goal}
            placeholder={totalPlaceholder as string}
            onChange={handleValueChange}
          />
          <DateField
            label={reachGoalBy as string}
            startDate={targetDate}
            stepInMonths={1}
            minimumDate={new Date()}
            onChange={handleDateChange}
          />
        </div>
        <div className="resultsContainer">
          <div className="monthly">
            <div className="monthlyLabel">{monthlyAmount}</div>
            <div className="monthlyValue">
              <FormattedMessage
                id="amountValue"
                values={{
                  value: result.monthlyAmount
                }}
              />
            </div>
          </div>
          <div
            className="footer"
            dangerouslySetInnerHTML={{
              __html: formatMessage(
                { id: 'resultText' },
                {
                  ...result,
                  goal: goal,
                  targetDate,
                  boldOpen: '<strong>',
                  boldClose: '</strong>'
                }
              )
            }}
          />
        </div>
        <button className="submitButton" onClick={submit}>
          {confirm}
        </button>
      </Card>
    </section>
  );
};
