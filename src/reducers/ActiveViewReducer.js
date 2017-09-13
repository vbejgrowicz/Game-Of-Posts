/*jshint esversion: 6*/
import { ACTIVE_CATEGORY, IS_LOADING, DETAILED_POST_VIEW } from '../actions/ActiveViewAction';

export function activeViewReducer (state = {category:"home", detailedPostView:false, isLoading: true}, action) {
  switch (action.type) {
    case ACTIVE_CATEGORY:
      return Object.assign({}, state,
        {category: action.category});
    case IS_LOADING:
      return Object.assign({}, state,
        {isLoading: action.isLoading});
    case DETAILED_POST_VIEW:
      return Object.assign({}, state,
        {detailedPostView: action.value});
    default :
    return state;
  }
}
