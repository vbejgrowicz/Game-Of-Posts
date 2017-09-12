/*jshint esversion: 6*/
import { getPosts, getPost, getCategoryPosts, updateVoteScore, addPost, updatePost, deletePost } from '../utils/DataFetch';
import { fetchComments } from './CommentsAction';

export const FETCH_IDS = "FETCH_IDS";
export const FETCH_POSTS = "FETCH_POSTS";
export const FETCH_POST = "FETCH_POST";
export const SORT_POSTS = "SORT_POSTS";
export const UPDATE_SORT = "UPDATE_SORT";
export const CHANGE_VOTESCORE = "CHANGE_VOTESCORE";
export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";

export function fetchAllIDs() {
  return function fetchPostIDsThunk(dispatch) {
    getPosts().then(response => {
      response.map((post) => dispatch(fetchComments(post.id)));
      dispatch({type: FETCH_IDS, postIDs: response });
    });
  };
}

export function fetchPosts(category) {
  return function fetchPostsThunk(dispatch) {
    if (category === "home") {
      getPosts().then(response => {
        response.map((post) => dispatch(fetchComments(post.id)));
        dispatch({type: FETCH_POSTS, posts: response });
      });
    }
    else {
      getCategoryPosts(category).then(response => {
        response.map((post) => dispatch(fetchComments(post.id)));
        dispatch({type: FETCH_POSTS, posts: response});
      });
    }
  };
}

export function fetchPost(id) {
  return function fetchPostThunk(dispatch) {
    getPost(id).then(response => {
      dispatch(fetchComments(response.id));
      dispatch({type: FETCH_POST, posts: response});
    });
  };
}

export const sortPosts = () => {
  return {
    type: SORT_POSTS
  };
};

export const updateSort = (sortMethod) => {
  return {
    type: UPDATE_SORT,
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
      if ((activeView === "home") || (activeView === response.category)) {
        dispatch({type: ADD_POST, newPost: response });
      }
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

export function removePost(id) {
  return function removePostThunk(dispatch, getState) {
    deletePost(id).then(() => {
      dispatch({type: DELETE_POST, id: id });
    });
  };
}
