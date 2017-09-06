/*jshint esversion: 6*/
import { getComments, updateCommentVoteScore, deleteComment } from '../utils/DataFetch';
import { sortByVoteScore, sortbyTimestamp } from '../utils/SortFunctions';


export const FETCH_COMMENTS = "FETCH_COMMENTS";
export const SORT_COMMENTS = "SORT_COMMENTS";
export const CHANGE_COMMENT_VOTESCORE = "CHANGE_COMMENT_VOTESCORE";
export const DELETE_COMMENT = "DELETE_COMMENT";

export function fetchComments(id) {
  return function fetchCommentsThunk(dispatch) {
    getComments(id).then(response => {
      var sorted = sortByVoteScore(response);
      dispatch({type: FETCH_COMMENTS, id: id, comments: sorted});
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
