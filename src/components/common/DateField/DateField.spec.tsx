import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import messages from '../../../lang/en';
import { IntlProvider } from 'react-intl';
import { DateField, DateFieldProps } from './DateField';

const startDate = new Date(2020, 0, 1);
const minDate = new Date(startDate.getTime());
const maxDate = new Date(startDate.getTime());
maxDate.setMonth(minDate.getMonth() + 2);

const defaultProps: DateFieldProps = { startDate };

const setup = (props: DateFieldProps = defaultProps) => {
  return render(
    <IntlProvider locale="en" messages={messages as any}>
      <DateField {...props} />
    </IntlProvider>
  );
};

describe('DateField', () => {
  const { getByTitle, getByText } = screen;
  describe('render', () => {
    beforeEach(() => {
      setup();
    });
    it('should render prev button', () => {
      expect(getByTitle(messages.previous)).toBeInTheDocument();
    });
    it('should render next button', () => {
      expect(getByTitle(messages.next)).toBeInTheDocument();
    });
    it('should render month', () => {
      expect(getByText('January')).toBeInTheDocument();
    });
    it('should render year', () => {
      expect(getByText('2020')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    function testForNextMonth() {
      it('Should display next month', () => {
        expect(getByText('February')).toBeInTheDocument();
      });
    }
    function testForPreviousMonth() {
      it('Should display previous month', () => {
        expect(getByText('December')).toBeInTheDocument();
        expect(getByText('2019')).toBeInTheDocument();
      });
    }

    describe('buttons', () => {
      describe('When click on next button', () => {
        beforeEach(() => {
          setup();
          fireEvent.click(getByTitle(messages.next));
        });
        testForNextMonth();
      });
      describe('When click on prev button', () => {
        beforeEach(() => {
          setup();
          fireEvent.click(getByTitle(messages.previous));
        });
        testForPreviousMonth();
      });
    });

    describe('keyboard keys', () => {
      describe('When press ArrowRight', () => {
        beforeEach(() => {
          setup();
          fireEvent.keyDown(document, { key: 'ArrowRight' });
        });
        testForNextMonth();
      });
      describe('When press ArrowLeft', () => {
        beforeEach(() => {
          setup();
          fireEvent.keyDown(document, { key: 'ArrowLeft' });
        });
        testForPreviousMonth();
      });
      describe('When press any other key', () => {
        beforeEach(() => {
          setup();
          fireEvent.keyDown(document, { key: 'a' });
        });
        it('Should display start month and year', () => {
          expect(getByText('January')).toBeInTheDocument();
          expect(getByText('2020')).toBeInTheDocument();
        });
      });
    });

    describe('When pass a minimumDate', () => {
      beforeEach(() => {
        setup({ ...defaultProps, minimumDate: minDate });
      });
      describe('when press previous', () => {
        it('date should never be less than minimumDate', () => {
          fireEvent.click(getByTitle(messages.previous));
          expect(getByText('January')).toBeInTheDocument();
        });
      });
    });
    describe('When pass a maximumDate', () => {
      beforeEach(() => {
        setup({ ...defaultProps, maximumDate: maxDate });
      });
      describe('when press next', () => {
        it('date should never be greater than maximumDate', () => {
          fireEvent.click(getByTitle(messages.next));
          expect(getByText('February')).toBeInTheDocument();

          fireEvent.click(getByTitle(messages.next));
          expect(getByText('March')).toBeInTheDocument();

          fireEvent.click(getByTitle(messages.next));
          expect(getByText('March')).toBeInTheDocument();
        });
      });
    });
    describe('when pass stepInMonths', () => {
      beforeEach(() => {
        setup({ ...defaultProps, stepInMonths: 2 });
      });
      it('should navigate counting months as stepInMonths', () => {
        fireEvent.click(getByTitle(messages.next));
        expect(getByText('March')).toBeInTheDocument();

        fireEvent.click(getByTitle(messages.previous));
        expect(getByText('January')).toBeInTheDocument();

        fireEvent.click(getByTitle(messages.previous));
        expect(getByText('November')).toBeInTheDocument();
        expect(getByText('2019')).toBeInTheDocument();
      });
    });

    describe('when pass onChange', () => {
      describe('When date is changed', () => {
        it('should call onChange with expected date as argument', () => {
          const onChange = jest.fn();
          const expectedDate = new Date(startDate.getTime());

          expectedDate.setMonth(expectedDate.getMonth() + 1);
          setup({ ...defaultProps, onChange });

          fireEvent.click(getByTitle(messages.next));
          expect(onChange).toHaveBeenCalledWith(expectedDate);
        });
      });
    });
  });
});
