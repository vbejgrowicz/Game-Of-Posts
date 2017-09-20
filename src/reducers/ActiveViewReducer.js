/*jshint esversion: 6*/
import { ACTIVE_CATEGORY, IS_LOADING, DETAILED_POST_VIEW } from '../actions/types';

export function activeViewReducer (state = {category:"", detailedPostView:false, LoadingStatus: false}, action) {
  switch (action.type) {
    case ACTIVE_CATEGORY:
      return Object.assign({}, state,
        {category: action.category});
    case IS_LOADING:
      return Object.assign({}, state,
        {LoadingStatus: action.isLoading});
    case DETAILED_POST_VIEW:
      return Object.assign({}, state,
        {detailedPostView: action.value});
    default :
    return state;
  }
}
