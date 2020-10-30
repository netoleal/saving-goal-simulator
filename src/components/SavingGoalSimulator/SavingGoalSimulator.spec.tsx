import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from 'react-intl';
import messages from 'lang/en';
import { SavingGoalSimulator } from './SavingGoalSimulator';
import times from 'lodash/times';
import { renderHook } from '@testing-library/react-hooks';
import {
  SavingGoalCalculatorResult,
  useSavingGoalCalculator
} from 'hooks/useSavingGoalCalculator';

const totalAmount = '200,000';
const numericAmount = 200000;
const nextClickCount = 3;
const deposits = 12 + nextClickCount; // starts with one year. and adding clickCount to test the next button click
const targetDate = new Date();
targetDate.setMonth(targetDate.getMonth() + deposits);

const IntlWrapper: React.FC = ({ children }) => (
  <IntlProvider messages={messages} locale="en-US">
    {children}
  </IntlProvider>
);

const setup = () => {
  return render(
    <IntlWrapper>
      <SavingGoalSimulator />
    </IntlWrapper>
  );
};

describe('SavingGoalSimulator', () => {
  const { getByText, getByAltText, getByPlaceholderText, getByRole } = screen;

  describe('rendering', () => {
    beforeEach(() => {
      setup();
    });
    it('should render title', () => {
      expect(
        getByText(content => content === messages.appTitle1.trim())
      ).toBeInTheDocument();
      expect(getByText(messages.appTitle2)).toBeInTheDocument();
    });
    it('should render card title and icon', () => {
      expect(getByAltText('Academy icon')).toBeInTheDocument();
      expect(getByText(messages.buyTitle)).toBeInTheDocument();
      expect(getByText(messages.buySubtitle)).toBeInTheDocument();
    });
    it('should render total amount field', () => {
      expect(getByText(messages.totalAmount)).toBeInTheDocument();
      expect(
        getByPlaceholderText(messages.totalPlaceholder)
      ).toBeInTheDocument();
    });
    it('should render target date field', () => {
      expect(getByText(messages.reachGoalBy)).toBeInTheDocument();
    });
    it('should render confirm button', () => {
      expect(
        getByRole('button', { name: messages.confirm })
      ).toBeInTheDocument();
    });
  });
  describe('Interactions', () => {
    describe(`when user clicks ${nextClickCount} times on next button`, () => {
      let result: SavingGoalCalculatorResult;
      beforeEach(() => {
        setup();
        const calculateResult = renderHook(() => useSavingGoalCalculator(), {
          wrapper: IntlWrapper
        }).result.current;
        fireEvent.change(getByPlaceholderText(messages.totalPlaceholder), {
          target: { value: totalAmount }
        });
        times(nextClickCount).forEach(() =>
          fireEvent.click(getByRole('button', { name: messages.next }))
        );
        result = calculateResult(numericAmount, targetDate);
      });
      it('should display correct monthly amount', () => {
        const value = Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(result.monthlyAmount);
        expect(getByText(value)).toBeInTheDocument();
      });
      it('should display results', () => {
        const targetDateString = Intl.DateTimeFormat('en-US', {
          month: 'long',
          year: 'numeric'
        }).format(targetDate);
        expect(getByText(`${deposits} monthly deposits`)).toBeInTheDocument();
        expect(getByText(targetDateString)).toBeInTheDocument();
        expect(getByText(`$${totalAmount}.00`)).toBeInTheDocument();
      });
    });
  });
});
