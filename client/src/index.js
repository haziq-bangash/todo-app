// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './Store/store';
import App from './App';

ReactDOM.render(
  // setting global states for the app using react-redux and redux-toolkit
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
