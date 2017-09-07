/*jshint esversion: 6*/
import { FETCH_COMMENTS, FETCH_COMMENT_ID, SORT_COMMENTS, CHANGE_COMMENT_VOTESCORE, DELETE_COMMENT, ADD_COMMENT, EDIT_COMMENT } from '../actions/CommentsAction';

const initialState = {
  sortedby: "voteScore",
  IDsUsed: null,
};

export function commentsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return Object.assign({}, state,
        {[action.id]: action.comments
      });
    case FETCH_COMMENT_ID:
      return Object.assign({},state,
        {IDsUsed: action.comments.map((comment) => {
          return comment.id;
        })}
      );
      case SORT_COMMENTS:
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
      case ADD_COMMENT:
        return Object.assign({}, state,
          {[action.parentId]: state[action.parentId].concat(action.newComment)}
      );
      case EDIT_COMMENT:
      return Object.assign({}, state,
        {[action.parentId]: state[action.parentId].map((comment) => {
          if (comment.id === action.id) {
            return Object.assign({}, [action.parentId],
              action.updatedComment
              );
            }
          return comment;
          })
        }
      );
  default:
  return state;
  }
}
