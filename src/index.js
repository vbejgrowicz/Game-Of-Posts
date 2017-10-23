/*jshint esversion: 6*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './style/index.css';
import App from './App';
import store from './utils/ReduxStore';
import { HashRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route component={App} />
    </Router>
  </Provider>, document.getElementById('root'));
