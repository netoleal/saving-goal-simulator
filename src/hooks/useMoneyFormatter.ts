import { useIntl } from 'react-intl';

// TODO: add tests
export function formatNumberToMoney(locale: string, number: number): string {
  const validValue = isNaN(number) ? 0 : number;
  const currency = new Intl.NumberFormat(locale).format(validValue);
  return currency;
}

export const useMoneyFormatter = (): ((value: number) => string) => {
  const { locale } = useIntl();
  return (value: number) => formatNumberToMoney(locale, value);
};
