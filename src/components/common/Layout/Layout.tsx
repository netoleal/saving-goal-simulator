import * as React from 'react';
import logoSrc from '../../../icons/logo.svg';
import './Layout.scss';

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <header>
        <img src={logoSrc} alt="Origin Logo" />
      </header>
      <main>{children}</main>
    </>
  );
};
