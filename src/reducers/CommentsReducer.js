/*jshint esversion: 6*/
import { FETCH_COMMENTS, SET_PARENT_ID, SORT_COMMENTS, UPDATE_COMMENT_SORT, CHANGE_COMMENT_VOTESCORE, DELETE_COMMENT, ADD_COMMENT, EDIT_COMMENT } from '../actions/CommentsAction';
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

function commentSort(comments, sort) {
  var sorted = [];
  if (sort === "voteScore") {
    sorted = sortByVoteScore(comments);
  }
  else if (sort === "timestamp") {
    sorted= sortbyTimestamp(comments);
  }
  else {
    return console.log('invalid sort');
  }
  return sorted;
}

function changeCommentVote(comments, id, voteScore) {
  return comments.map((comment) => {
    if (comment.id === id) {
      return Object.assign({}, comment, {
        voteScore: voteScore
      });
    }
  return comment;
  });
}

const removeDeletedComment = (comments, id) => {
  return comments.filter((comment) => {
    return comment.id !== id;
  });
};

function editCommentfunction(comments, updatedComment) {
  return comments.map((comment) => {
    if (comment.id === updatedComment.id) {
      return Object.assign({}, [updatedComment.parentId],
        updatedComment
        );
      }
    return comment;
  });
}

export function commentsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return Object.assign({}, state,
        {IDsUsed: state.IDsUsed.concat(getCommentIDs(action.comments))},
        {comments: Object.assign({}, state.comments,
          {[action.id]: commentSort(action.comments, state.sortedby)}
        )}
      );
    case SET_PARENT_ID:
      return Object.assign({}, state,
        {parentId: action.parentId}
      );
    case SORT_COMMENTS:
      return Object.assign({}, state,
        {comments: Object.assign({}, state.comments,
          {[state.parentId] : commentSort(state.comments[state.parentId], state.sortedby)}
        )}
      );
    case UPDATE_COMMENT_SORT:
      return Object.assign({}, state,
        {sortedby: action.sortMethod},
        {comments: Object.assign({}, state.comments,
          {[state.parentId] : commentSort(state.comments[state.parentId], action.sortMethod)}
        )}
      );
      case CHANGE_COMMENT_VOTESCORE:
      return Object.assign({}, state,
        {comments: Object.assign({}, state.comments,
          {[action.parentId]: changeCommentVote(state.comments[action.parentId], action.id, action.voteScore)}
        )}
      );
      case DELETE_COMMENT:
        return Object.assign({}, state,
          {IDsUsed: state.IDsUsed.filter(function(id) {return (id !== action.id);})},
          {comments: Object.assign({}, state.comments,
            {[action.parentId]: removeDeletedComment(state.comments[action.parentId], action.id)}
          )}
        );
      case ADD_COMMENT:
        return Object.assign({}, state,
          {IDsUsed: state.IDsUsed.concat(action.newComment.id)},
          {comments: Object.assign({}, state.comments, {
            [action.parentId]: commentSort(state.comments[action.parentId].concat(action.newComment), state.sortedby)}
          )}
        );
      case EDIT_COMMENT:
      return Object.assign({}, state,
        {comments: Object.assign({}, state.comments,
          {[action.parentId]: commentSort(editCommentfunction(state.comments[action.parentId], action.updatedComment), state.sortedby)}
        )}
      );
  default:
    return state;
  }
}
