import * as React from 'react';
import classnames from 'classnames';
import './Card.scss';

export type CardProps = {
  className?: string;
};

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return <div className={classnames('card', className)}>{children}</div>;
};
