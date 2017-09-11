/*jshint esversion: 6*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './style/index.css';
import App from './App';
import store from './utils/ReduxStore';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
