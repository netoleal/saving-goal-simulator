import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IntlProvider } from 'react-intl';
import messages from '../../../lang/en';
import { MoneyField, MoneyFieldProps } from './MoneyField';

const defaultProps: MoneyFieldProps = { startValue: 0 };
const setup = (props: MoneyFieldProps = defaultProps) => {
  return render(
    <IntlProvider messages={messages} locale="en-US">
      <MoneyField {...props} />
    </IntlProvider>
  );
};

describe('MoneyField', () => {
  const { getByText, getByRole, getByDisplayValue } = screen;
  describe('rendering', () => {
    beforeEach(() => {
      setup();
    });
    it('should render currency indicator', () => {
      expect(getByText('$')).toBeInTheDocument();
    });
    it('should render input field', () => {
      expect(getByRole('textbox')).toBeInTheDocument();
    });
  });

  describe('formatting', () => {
    describe('When value is changed', () => {
      it('should get numeric value and format as money', () => {
        setup();
        fireEvent.change(getByRole('textbox'), {
          target: { value: 'ab123456' }
        });
        expect(getByDisplayValue('123,456')).toBeInTheDocument();
      });
    });
  });

  describe('events', () => {
    describe('When value is changed', () => {
      it('should call onChange with numeric value', () => {
        const onChange = jest.fn();
        setup({ ...defaultProps, onChange });

        fireEvent.change(getByRole('textbox'), {
          target: { value: 'ab123456' }
        });

        expect(onChange).toHaveBeenCalledWith(123456);
      });
    });
  });
});
