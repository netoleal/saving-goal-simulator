import * as React from 'react';
import { GenericField } from '../GenericField';
import './DateField.scss';
import { FieldComponentProps } from '../../../types/FieldsTypes';
import arrow from '../../../icons/arrow.svg';
import { FormattedMessage, useIntl } from 'react-intl';
import noop from 'lodash/noop';

export type DateFieldProps = {
  startDate: Date;
  minimumDate?: Date;
  maximumDate?: Date;
  stepInMonths?: number;
  onChange?: (newDate: Date) => void;
} & FieldComponentProps;

export const DateField: React.FC<DateFieldProps> = ({
  label,
  startDate,
  minimumDate,
  maximumDate,
  stepInMonths = 1,
  onChange = noop
}) => {
  const {
    messages: { next, previous }
  } = useIntl();
  const [currentDate, setCurrentDate] = React.useState(startDate);

  function hasPrevious(): boolean {
    if (!minimumDate) return true;
    const targetDate = new Date(currentDate.getTime());
    targetDate.setMonth(targetDate.getMonth() - stepInMonths);

    return targetDate.getTime() >= minimumDate.getTime();
  }

  function hasNext(): boolean {
    if (!maximumDate) return true;
    const targetDate = new Date(currentDate.getTime());
    targetDate.setMonth(targetDate.getMonth() + stepInMonths);

    return targetDate.getTime() <= maximumDate.getTime();
  }

  function handleNextClick() {
    const targetDate = new Date(currentDate.getTime());
    targetDate.setMonth(targetDate.getMonth() + stepInMonths);
    setCurrentDate(targetDate);
  }
  function handlePrevClick() {
    const targetDate = new Date(currentDate.getTime());
    targetDate.setMonth(targetDate.getMonth() - stepInMonths);
    setCurrentDate(targetDate);
  }

  const buttonPrev = (
    <button
      disabled={!hasPrevious()}
      onClick={handlePrevClick}
      title={previous as string}
    >
      <img src={arrow} alt="icon" />
    </button>
  );
  const buttonNext = (
    <button
      disabled={!hasNext()}
      onClick={handleNextClick}
      title={next as string}
    >
      <img src={arrow} alt="icon" className="inverted" />
    </button>
  );

  function handleKeyDown(event: KeyboardEvent) {
    const keyMap: { [x: string]: () => void } = {
      ArrowLeft: handlePrevClick,
      ArrowRight: handleNextClick
    };
    const keyHandler = keyMap[event.key];
    if (keyHandler) {
      keyHandler();
    }
  }

  React.useEffect(() => {
    onChange(currentDate);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  return (
    <GenericField
      label={label}
      className="DateField"
      extraComponents={{ start: buttonPrev, end: buttonNext }}
    >
      <span className="month fieldValue">
        <FormattedMessage id="month" values={{ value: currentDate }} />
      </span>
      <span className="year">
        <FormattedMessage id="year" values={{ value: currentDate }} />
      </span>
    </GenericField>
  );
};
