/*jshint esversion: 6*/
import { getCategories } from '../utils/DataFetch';

export function fetchCategories() {
  return function fetchCategoriesThunk(dispatch) {
    getCategories().then(response => {
      dispatch({type: 'FETCH_CATEGORIES', categories: response});
    });
  };
}
