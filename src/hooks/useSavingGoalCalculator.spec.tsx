import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { IntlProvider } from 'react-intl';
import messages from 'lang/en/messages';
import {
  useSavingGoalCalculator,
  SavingGoalCalculatorResult
} from './useSavingGoalCalculator';

const validTotal = 20000;
const today = new Date();
const threeMonths = new Date(today.getTime());
const lastMonth = new Date(today.getTime());

threeMonths.setMonth(threeMonths.getMonth() + 3);
lastMonth.setMonth(lastMonth.getMonth() - 1);

const HookWrapper: React.FC = ({ children }) => (
  <IntlProvider messages={messages} locale="en-US">
    {children}
  </IntlProvider>
);

describe('useSavingGoalCalculator', () => {
  let hook: (
    totalAmount: number,
    targetDate: Date
  ) => SavingGoalCalculatorResult;
  beforeEach(() => {
    hook = renderHook(() => useSavingGoalCalculator(), { wrapper: HookWrapper })
      .result.current;
  });
  describe('when pass valid values', () => {
    it('should return a valid result', () => {
      const result = hook(validTotal, threeMonths);
      expect(result).toEqual({
        deposits: 3,
        monthlyAmount: Math.ceil(validTotal / 3)
      });
    });
  });

  describe('when pass an invalid date', () => {
    it('should return 0/0', () => {
      const result = hook(validTotal, lastMonth);
      expect(result).toEqual({
        deposits: 0,
        monthlyAmount: 0
      });
    });
  });
});
