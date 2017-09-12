/*jshint esversion: 6*/
import { FETCH_COMMENTS, SORT_COMMENTS, UPDATE_SORT, CHANGE_COMMENT_VOTESCORE, DELETE_COMMENT, ADD_COMMENT, EDIT_COMMENT } from '../actions/CommentsAction';
import { sortByVoteScore, sortbyTimestamp } from '../utils/SortFunctions';

const initialState = {
  comments: [],
  sortedby: "voteScore",
  IDsUsed: [],
};

function getCommentIDs(comments) {
  var list = [];
  comments.forEach(function(comment) {
    list.push(comment.id);
  });
  return list;
}

function sortComments(comments, sortedby) {
  var sorted = [];
  if (sortedby === "voteScore") {
    sorted = sortByVoteScore(comments);
  }
  else if (sortedby === "timestamp") {
    sorted = sortbyTimestamp(comments);
  }
  else {
    return console.log('invalid sort');
  }
  return sorted;
}

export function commentsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return Object.assign({}, state,
        {IDsUsed: state.IDsUsed.concat(action.IDlist)},
        {comments: Object.assign({}, state.comments,
          {[action.id]: sortComments(action.comments, state.sortedby)
      })
    });
    case SORT_COMMENTS:
      return Object.assign({}, state,
        {comments: Object.assign({}, state.comments,
          {[action.parentId]: sortComments(state.comments[action.parentId], state.sortedby)}
        )}
      );
      case UPDATE_SORT:
        return Object.assign({}, state,
          {sortedby: action.sortMethod}
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
          })
        })
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
