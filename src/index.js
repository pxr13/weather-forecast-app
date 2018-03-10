import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './components/App/App.jsx';

// const store = configureStore();

window.store = store;

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
