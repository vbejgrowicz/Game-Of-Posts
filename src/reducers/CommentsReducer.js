/*jshint esversion: 6*/
import { FETCH_COMMENTS, SORT_COMMENTS, CHANGE_COMMENT_VOTESCORE, DELETE_COMMENT, ADD_COMMENT, EDIT_COMMENT } from '../actions/CommentsAction';

const initialState = {
  comments: [],
  sortedby: "voteScore",
  IDsUsed: [],
};

export function commentsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return Object.assign({}, state,
        {IDsUsed: state.IDsUsed.concat(action.IDlist)},
        {comments: Object.assign({}, state.comments,
          {[action.id]: action.comments
      })
    });
    case SORT_COMMENTS:
      return Object.assign({}, state,
        {comments: Object.assign({}, state.comments,
          {[action.parentId]: action.comments}
        )},
        {sortedby: action.sort}
      );
      case CHANGE_COMMENT_VOTESCORE:
        return Object.assign({}, state,
          {comments: Object.assign({}, state.comments,
            {[action.parentId]: state.comments[action.parentId].map((comment) => {
              if (comment.id === action.id) {
                return Object.assign({}, comment, {
                  voteScore: action.voteScore
                });
              }
              return comment;
            })})
          }
        );
      case DELETE_COMMENT:
        return Object.assign({}, state,
          {IDsUsed: state.IDsUsed.filter(function(id) {return (id !== action.id);})},
          {comments: Object.assign({}, state.comments,
            {[action.parentId]: state.comments[action.parentId].filter(function(comment) {return (comment.id !== action.id);})}
          )}
        );
      case ADD_COMMENT:
        return Object.assign({}, state,
          {IDsUsed: state.IDsUsed.concat(action.newComment.id)},
          {comments: Object.assign({}, state.comments, {
            [action.parentId]: state.comments[action.parentId].concat(action.newComment)}
          )}
        );
      case EDIT_COMMENT:
      return Object.assign({}, state,
        {comments: Object.assign({}, state.comments,
          {[action.parentId]: state.comments[action.parentId].map((comment) => {
            if (comment.id === action.id) {
              return Object.assign({}, [action.parentId],
                action.updatedComment
                );
              }
            return comment;
            })
          })
        }
      );
  default:
  return state;
  }
}
