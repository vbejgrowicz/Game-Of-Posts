/*jshint esversion: 6*/
import { getComments, updateCommentVoteScore, deleteComment, addComment, updateComment} from '../utils/DataFetch';
import { sortByVoteScore, sortbyTimestamp } from '../utils/SortFunctions';


export const FETCH_COMMENTS = "FETCH_COMMENTS";
export const FETCH_COMMENT_ID = "FETCH_COMMENT_ID";
export const SORT_COMMENTS = "SORT_COMMENTS";
export const CHANGE_COMMENT_VOTESCORE = "CHANGE_COMMENT_VOTESCORE";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";



export function fetchComments(id) {
  return function fetchCommentsThunk(dispatch) {
    getComments(id).then(response => {
      var sorted = sortByVoteScore(response);
      dispatch({type: FETCH_COMMENTS, id: id, comments: sorted});
      });
    };
  }

export function fetchCommentIDs(id) {
  return function fetchCommentIDsThunk(dispatch) {
    getComments(id).then(response => {
      dispatch({type: FETCH_COMMENT_ID, comments: response});
      });
    };
  }

export function removeComment(parentId, id) {
  return function removeCommentThunk(dispatch) {
    deleteComment(id).then(
      dispatch({type: DELETE_COMMENT, parentId: parentId, id: id })
    );
  };
}

export function sortComments(parentId, comments, sortMethod) {
  return function sortThunk(dispatch, getState) {
    var sorted = "";
    if (sortMethod === "voteScore") {
      sorted = sortByVoteScore(comments);
    }
    else if (sortMethod === "timestamp") {
      sorted = sortbyTimestamp(comments);
    }
    else {
      return console.log('invalid sort');
    }
    return dispatch({type: SORT_COMMENTS, parentId: parentId, comments:sorted, sort:sortMethod});
  };
}

export function changeCommentVoteScore(commentId, vote) {
  return function changeCommentVoteScoreThunk(dispatch, getState) {
    updateCommentVoteScore(commentId, vote).then(response => {
      var parentId = response.parentId;
      var id = response.id;
      var voteScore = response.voteScore;
      dispatch({type: CHANGE_COMMENT_VOTESCORE, parentId: parentId, id: id, voteScore: voteScore });
        const updatedComments = getState().commentsReducer[parentId];
        const sortMethod = getState().commentsReducer.sortedby;
        return dispatch(sortComments(parentId, updatedComments, sortMethod));
      });
  };
}


export function newComment(id, timestamp, body, author, parentId) {
  return function newCommentThunk(dispatch, getState) {
    addComment(id, timestamp, body, author, parentId).then(response => {
      dispatch({type: ADD_COMMENT, parentId: parentId, id:response.id, newComment: response });
      const updatedComments = getState().commentsReducer[parentId];
      const sortMethod = getState().commentsReducer.sortedby;
      return dispatch(sortComments(parentId, updatedComments, sortMethod));
    });
  };
}

export function editComment(id, timestamp, body) {
  return function editPostThunk(dispatch, getState) {
    updateComment(id, timestamp, body).then(response => {
      dispatch({type: EDIT_COMMENT, parentId: response.parentId, id: response.id, updatedComment: response });
      const updatedComments = getState().commentsReducer;
      const sortMethod = getState().commentsReducer.sortedby;
      return dispatch(sortComments(updatedComments, sortMethod));
    });
  };
}
