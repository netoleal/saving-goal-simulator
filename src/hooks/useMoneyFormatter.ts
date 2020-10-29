import { useIntl } from 'react-intl';

export function formatNumberToMoney(locale: string, number: number): string {
  if (isNaN(number) || !isFinite(number)) {
    return '0';
  }
  const currency = new Intl.NumberFormat(locale).format(number);
  return currency;
}

export const useMoneyFormatter = (): ((value: number) => string) => {
  const { locale } = useIntl();
  return (value: number) => formatNumberToMoney(locale, value);
};
