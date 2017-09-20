/*jshint esversion: 6*/
import { FETCH_CATEGORIES } from '../actions/types';

export function categoriesReducer (state = {categories:[]}, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return Object.assign({}, state,
        {categories: state.categories.concat(action.categories)
      });
    default :
    return state;
  }
}
