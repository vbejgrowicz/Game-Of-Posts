/*jshint esversion: 6*/
import { getPosts, updateVoteScore, addPost, updatePost, deletePost } from '../utils/DataFetch';
import { isNotLoading } from './ActiveViewAction';
import { fetchComments } from './CommentsAction';

export const FETCH_POSTS = "FETCH_POSTS";
export const FETCH_POST_DETAILS = "FETCH_POST_DETAILS";
export const FETCH_CURRENT_POSTS = "FETCH_CURRENT_POSTS";
export const SORT_POSTS = "SORT_POSTS";
export const UPDATE_POST_SORT = "UPDATE_POST_SORT";
export const CHANGE_VOTESCORE = "CHANGE_VOTESCORE";
export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";

export function fetchAll() {
  return function fetchPostIDsThunk(dispatch) {
    getPosts().then(response => {
      response.map((post) => dispatch(fetchComments(post.id)));
      dispatch({type: FETCH_POSTS, posts: response });
      dispatch(isNotLoading());
    });
  };
}

export const fetchCurrentPosts = (category) => {
  return {
    type: FETCH_CURRENT_POSTS,
    category
  };
};

export const fetchPostDetails = (id) => {
  return {
    type: FETCH_POST_DETAILS,
    id
  };
};

export const sortPosts = () => {
  return {
    type: SORT_POSTS
  };
};

export const updatePostSort = (sortMethod) => {
  return {
    type: UPDATE_POST_SORT,
    sortMethod
  };
};

export function changeVoteScore(post, vote) {
  return function changeVoteScoreThunk(dispatch, getState) {
    updateVoteScore(post, vote).then(response => {
      dispatch({type: CHANGE_VOTESCORE, id: response.id, voteScore: response.voteScore });
      dispatch(sortPosts());
    });
  };
}

export function newPost(activeView, id, timestamp, title, body, author, category) {
  return function newPostThunk(dispatch, getState) {
    addPost(id, timestamp, title, body, author, category).then(response => {
      dispatch(fetchComments(response.id));
      dispatch({type: ADD_POST, category: activeView, newPost: response });
    });
  };
}

export function editPost(id, title, body) {
  return function editPostThunk(dispatch, getState) {
    updatePost(id, title, body).then(response => {
      dispatch({type: EDIT_POST, id: response.id, updatedPost: response });
    });
  };
}

export function removePost(id, home) {
  return function removePostThunk(dispatch) {
    deletePost(id).then(() => {
      dispatch({type: DELETE_POST, id: id });
      if (home) {
        home();
      }
      dispatch(isNotLoading());
    });
  };
}
