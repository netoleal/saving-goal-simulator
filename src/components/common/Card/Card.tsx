import * as React from 'react';
import classnames from 'classnames';
import './Card.scss';
import { TestComponent } from '../Test/TestComponent';

export type CardProps = {
  className?: string;
};

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <>
      {/* <TestComponent /> */}
      <div className={classnames('card', className)}>{children}</div>
    </>
  );
};
