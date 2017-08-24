/*jshint esversion: 6*/
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { categoriesReducer } from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(categoriesReducer, composeEnhancers(applyMiddleware(thunk)));

store.subscribe(() => {
  console.log("store updated", store.getState());
});

export default store;
