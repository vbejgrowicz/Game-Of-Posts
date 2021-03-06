/*jshint esversion: 6*/
import { getPosts, updateVoteScore, addPost, updatePost, deletePost } from '../utils/DataFetch';
import { isNotLoading } from './ActiveViewAction';
import { fetchComments, fetchAllComments } from './CommentsAction';

function filterAllDeleted(post) {
  return post.deleted !== true;
}

export function fetchAll() {
  return function fetchPostIDsThunk(dispatch) {
    getPosts().then(response => {
      const filteredPosts = response.filter(filterAllDeleted);
      if (filteredPosts.length === 0) {
        dispatch(isNotLoading());
      }
      else {
        dispatch(fetchAllComments(filteredPosts));
        dispatch({type: 'FETCH_POSTS', posts: filteredPosts });
      }
    });
  };
}

export const fetchCurrentPosts = (category) => {
  return {
    type: 'FETCH_CURRENT_POSTS',
    category
  };
};

export const fetchPostDetails = (id) => {
  return {
    type: 'FETCH_POST_DETAILS',
    id
  };
};

export const sortPosts = () => {
  return {
    type: 'SORT_POSTS'
  };
};

export const updatePostSort = (sortMethod) => {
  return {
    type: 'UPDATE_POST_SORT',
    sortMethod
  };
};

export function changeVoteScore(post, vote) {
  return function changeVoteScoreThunk(dispatch, getState) {
    updateVoteScore(post, vote).then(response => {
      dispatch({type: 'CHANGE_VOTESCORE', id: response.id, voteScore: response.voteScore });
    });
  };
}

export function newPost(activeView, id, timestamp, title, body, author, category) {
  return function newPostThunk(dispatch, getState) {
    addPost(id, timestamp, title, body, author, category).then(response => {
      dispatch(fetchComments(response.id));
      dispatch({type: 'ADD_POST', category: activeView, newPost: response });
    });
  };
}

export function editPost(id, title, body) {
  return function editPostThunk(dispatch, getState) {
    updatePost(id, title, body).then(response => {
      dispatch({type: 'EDIT_POST', updatedPost: response });
    });
  };
}

export function removePost(id, home) {
  return function removePostThunk(dispatch) {
    deletePost(id).then(() => {
      dispatch({type: 'DELETE_POST', id: id });
      if (home) {
        home();
      }
      dispatch(isNotLoading());
    });
  };
}
