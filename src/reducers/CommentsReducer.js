/*jshint esversion: 6*/
import { FETCH_COMMENTS } from '../actions/CommentsAction';

export function commentsReducer (state = [], action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return Object.assign({}, state,
        {[action.id]: action.comments
      });
  default:
    return state;
  }
}
