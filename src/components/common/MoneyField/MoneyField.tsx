import * as React from 'react';
import './MoneyField.scss';
import { GenericField } from '../GenericField';
import { FieldComponentProps } from '../../../types/FieldsTypes';
import noop from 'lodash/noop';
import { useMoneyFormatter } from '../../../hooks/useMoneyFormatter';

export type MoneyFieldProps = {
  startValue: number;
  placeholder?: string;
  onChange?: (value: number) => void;
} & FieldComponentProps;

export const MoneyField: React.FC<MoneyFieldProps> = ({
  label,
  startValue,
  placeholder,
  onChange = noop
}) => {
  const moneyFormatter = useMoneyFormatter();
  const [currentValue, setCurrentValue] = React.useState(
    moneyFormatter(startValue)
  );
  const currencyIndicator = <div className="currency">$</div>;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const currentValue = parseInt(event.target.value.replace(/\D/g, ''));
    const validValue = isNaN(currentValue) ? 0 : currentValue;
    const currency = moneyFormatter(validValue);

    setCurrentValue(currency);
    onChange(validValue);
  }

  React.useEffect(() => {
    const numericValue = parseInt(currentValue.replace(/\D/g, ''));
    onChange(numericValue);
  }, [currentValue]);

  return (
    <GenericField
      className="MoneyField"
      label={label}
      extraComponents={{ start: currencyIndicator }}
    >
      <input
        type="text"
        value={currentValue}
        placeholder={placeholder}
        className="input fieldValue"
        onChange={handleChange}
      />
    </GenericField>
  );
};
