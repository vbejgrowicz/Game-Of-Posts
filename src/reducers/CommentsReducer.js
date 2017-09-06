/*jshint esversion: 6*/
import { FETCH_COMMENTS, SORT_COMMENTS, CHANGE_COMMENT_VOTESCORE, DELETE_COMMENT } from '../actions/CommentsAction';

const initialState = {
  sortedby: "voteScore",
};

export function commentsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return Object.assign({}, state,
        {[action.id]: action.comments
      });
      case SORT_COMMENTS:
        console.log(action);
        return Object.assign({}, state,
          {[action.parentId]: action.comments,
          sortedby: action.sort
      });
      case CHANGE_COMMENT_VOTESCORE:
        return Object.assign({}, state,
          {[action.parentId]: state[action.parentId].map((comment) => {
            if (comment.id === action.id) {
              return Object.assign({}, comment, {
                voteScore: action.voteScore
              });
            }
            return comment;
          })}
        );
      case DELETE_COMMENT:
        return Object.assign({}, state,
          {[action.parentId]: state[action.parentId].filter(function(comment) {return (comment.id !== action.id);})}
        );
  default:
  return state;
  }
}
