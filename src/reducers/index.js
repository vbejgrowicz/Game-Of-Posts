/*jshint esversion: 6*/
import { FETCH_CATEGORIES } from '../actions';

export function categoriesReducer (state = {categories: []}, action){
  switch (action.type) {
    case FETCH_CATEGORIES:
      state = {
        ...state,
        categories: action.categories
      };
      return state;
    default :
    return state;
  }
}
