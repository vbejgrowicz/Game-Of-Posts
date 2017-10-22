/*jshint esversion: 6*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './style/index.css';
import App from './App';
import store from './utils/ReduxStore';
import { Router, Route, hashHistory } from 'react-router';
import HomePage from './components/HomePage';
import DisplayCategories from './components/CategoryNavbar/DisplayCategories';
import PostDetailView from './components/Posts/PostDetailView';
import DetailPage from './components/DetailPage';

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route component={App}>
        <Route component={HomePage}>
          <Route path="/(:category)" component={DisplayCategories} />
        </Route>
        <Route component={DetailPage}>
          <Route path="/(:category)/(:postID)" component={PostDetailView} />
        </Route>
      </Route>
    </Router>
  </Provider>, document.getElementById('root'));
