import * as React from 'react';
import './MoneyField.scss';
import { GenericField } from '../GenericField';
import { FieldComponentProps } from '../../../types/FieldsTypes';

export type MoneyFieldProps = FieldComponentProps;

export const MoneyField: React.FC<MoneyFieldProps> = ({ label }) => {
  const currencyIndicator = <div className="currency">$</div>;
  return (
    <GenericField
      className="MoneyField"
      label={label}
      extraComponents={{ start: currencyIndicator }}
    >
      money field
    </GenericField>
  );
};
