/*jshint esversion: 6*/
import { ACTIVE_CATEGORY, DETAILED_POST_VIEW } from '../actions/ActiveViewAction';

export function activeViewReducer (state = {category:"home", detailedPostView:false}, action) {
  switch (action.type) {
    case ACTIVE_CATEGORY:
      return Object.assign({}, state,
        {category: action.category});
    case DETAILED_POST_VIEW:
      return Object.assign({}, state,
        {detailedPostView: action.value});
    default :
    return state;
  }
}
