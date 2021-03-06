/*jshint esversion: 6*/
import { getComments, updateCommentVoteScore, deleteComment, addComment, updateComment} from '../utils/DataFetch';

export const setParentID = (parentId) => {
  return {
    type: 'SET_PARENT_ID',
    parentId
  };
};

export function fetchAllComments(posts) {
  return function fetchAllCommentsThunk(dispatch) {
    posts.map((post) => {
      return dispatch(fetchComments(post.id));
    });
  };
}

export function fetchComments(id) {
  return function fetchCommentsThunk(dispatch) {
    getComments(id).then(response => {
      dispatch({type: 'FETCH_COMMENTS', comments: response, id: id});
      });
    };
  }

export function removeComment(parentId, id) {
  return function removeCommentThunk(dispatch) {
    deleteComment(id).then(
      dispatch({type: 'DELETE_COMMENT', parentId: parentId, id: id })
    );
  };
}

export const sortComments = (parentId) => {
  return {
    type: 'SORT_COMMENTS',
    parentId
  };
};

export const updateCommentSort = (sortMethod, parentId) => {
  return {
    type: 'UPDATE_COMMENT_SORT',
    sortMethod,
    parentId
  };
};

export function changeCommentVoteScore(commentId, vote) {
  return function changeCommentVoteScoreThunk(dispatch, getState) {
    updateCommentVoteScore(commentId, vote).then(response => {
      dispatch({type: 'CHANGE_COMMENT_VOTESCORE', parentId: response.parentId, id: response.id, voteScore: response.voteScore });
      dispatch(sortComments(response.parentId));
    });
  };
}


export function newComment(id, timestamp, body, author, parentId) {
  return function newCommentThunk(dispatch, getState) {
    addComment(id, timestamp, body, author, parentId).then(response => {
      dispatch({type: 'ADD_COMMENT', parentId: parentId, id:response.id, newComment: response });
    });
  };
}

export function editComment(id, timestamp, body) {
  return function editPostThunk(dispatch, getState) {
    updateComment(id, timestamp, body).then(response => {
      dispatch({type: 'EDIT_COMMENT', parentId: response.parentId, id: response.id, updatedComment: response });
    });
  };
}
