import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import messages from './lang/en';
import App from './App';
import { Provider } from 'react-redux';
import './index.scss';
import { configureStore } from './store/index';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider messages={messages} locale="en-US" defaultLocale="en-US">
      <App />
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
);
