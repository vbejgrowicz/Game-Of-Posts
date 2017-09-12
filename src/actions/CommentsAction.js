/*jshint esversion: 6*/
import { getComments, updateCommentVoteScore, deleteComment, addComment, updateComment} from '../utils/DataFetch';

export const FETCH_COMMENTS = "FETCH_COMMENTS";
export const UPDATE_SORT = "UPDATE_SORT";
export const SORT_COMMENTS = "SORT_COMMENTS";
export const CHANGE_COMMENT_VOTESCORE = "CHANGE_COMMENT_VOTESCORE";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";



export function fetchComments(id) {
  return function fetchCommentsThunk(dispatch) {
    getComments(id).then(response => {
      dispatch({type: FETCH_COMMENTS, comments: response, id: id});
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

export const sortComments = (parentId) => {
  return {
    type: SORT_COMMENTS,
    parentId
  };
};

export const updateSort = (parentId, sortMethod) => {
  return {
    type: UPDATE_SORT,
    parentId,
    sortMethod
  };
};

export function changeCommentVoteScore(commentId, vote) {
  return function changeCommentVoteScoreThunk(dispatch, getState) {
    updateCommentVoteScore(commentId, vote).then(response => {
      dispatch({type: CHANGE_COMMENT_VOTESCORE, parentId: response.parentId, id: response.id, voteScore: response.voteScore });
      dispatch(sortComments(response.parentId));
    });
  };
}


export function newComment(id, timestamp, body, author, parentId) {
  return function newCommentThunk(dispatch, getState) {
    addComment(id, timestamp, body, author, parentId).then(response => {
      dispatch({type: ADD_COMMENT, parentId: parentId, id:response.id, newComment: response });
      const updatedComments = getState().commentsReducer.comments[parentId];
      const sortMethod = getState().commentsReducer.sortedby;
      return dispatch(sortComments(parentId, updatedComments, sortMethod));
    });
  };
}

export function editComment(id, timestamp, body) {
  return function editPostThunk(dispatch, getState) {
    updateComment(id, timestamp, body).then(response => {
      dispatch({type: EDIT_COMMENT, parentId: response.parentId, id: response.id, updatedComment: response });
      const parentId = response.parentId;
      const updatedComments = getState().commentsReducer.comments[parentId];
      const sortMethod = getState().commentsReducer.sortedby;
      return dispatch(sortComments(parentId, updatedComments, sortMethod));
    });
  };
}
