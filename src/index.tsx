import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import messages from './lang/en';
import App from './App';
import './index.scss';

ReactDOM.render(
  <IntlProvider messages={messages} locale="en-US" defaultLocale="en-US">
    <App />
  </IntlProvider>,
  document.getElementById('root')
);
