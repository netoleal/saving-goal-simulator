import React from 'react';
import { useMoneyFormatter } from './useMoneyFormatter';
import { renderHook } from '@testing-library/react-hooks';
import { IntlProvider } from 'react-intl';
import messages from 'lang/en/messages';

const HookWrapper: React.FC = ({ children }) => (
  <IntlProvider messages={messages} locale="en-US">
    {children}
  </IntlProvider>
);
describe('useMoneyFormatter', () => {
  let hook: (value: number) => string;
  beforeEach(() => {
    hook = renderHook(() => useMoneyFormatter(), { wrapper: HookWrapper })
      .result.current;
  });

  describe('when pass a number', () => {
    it('should return a money-formatted string', () => {
      const result = hook(2000);
      const expected = '2,000';
      expect(result).toBe(expected);
    });
  });

  describe('when pass not a number', () => {
    it('should return 0', () => {
      const result = hook(10 / 0);
      const expected = '0';
      expect(result).toBe(expected);
    });
  });
});
