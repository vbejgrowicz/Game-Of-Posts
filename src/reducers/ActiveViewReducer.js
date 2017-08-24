/*jshint esversion: 6*/
import { ACTIVE_CATEGORY } from '../actions/ActiveViewAction';

export function activeViewReducer (state = {category:[]}, action) {
  switch (action.type) {
    case ACTIVE_CATEGORY:
      return Object.assign({}, state,
        {category: action.category});
    default :
    return state;
  }
}
