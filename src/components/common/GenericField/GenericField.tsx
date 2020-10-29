import * as React from 'react';
import classnames from 'classnames';
import './GenericField.scss';

export type GenericFieldProps = {
  className?: string;
  label?: string;
  extraComponents?: {
    start?: string | JSX.Element;
    end?: string | JSX.Element;
  };
};

export const GenericField: React.FC<GenericFieldProps> = ({
  extraComponents,
  className,
  label,
  children
}) => {
  return (
    <div className={classnames(className)}>
      {!!label && <label className="label">{label}</label>}
      <div className="GenericField">
        {extraComponents?.start && (
          <div className="extraComponent">{extraComponents.start}</div>
        )}
        <div className="middle">{children}</div>
        {extraComponents?.end && (
          <div className="extraComponent">{extraComponents.end}</div>
        )}
      </div>
    </div>
  );
};
