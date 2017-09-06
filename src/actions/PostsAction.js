/*jshint esversion: 6*/
import { getPosts, getCategoryPosts, updateVoteScore, addPost, updatePost } from '../utils/DataFetch';
import { sortByVoteScore, sortbyTimestamp } from '../utils/SortFunctions';

export const FETCH_POSTS = "FETCH_POSTS";
export const SORT_POSTS = "SORT_POSTS";
export const CHANGE_VOTESCORE = "CHANGE_VOTESCORE";
export const FETCH_ID = "FETCH_ID";
export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";

export function fetchPosts() {
  return function fetchPostsThunk(dispatch) {
    getPosts().then(response => {
      var sorted = sortByVoteScore(response);
      dispatch({type: FETCH_POSTS, posts: sorted});
    });
  };
}

export function fetchCategoryPosts(category) {
  return function fetchCategoryPostsThunk(dispatch) {
    getCategoryPosts(category).then(response => {
      var sorted = sortByVoteScore(response);
      dispatch({type: FETCH_POSTS, posts: sorted});
    });
  };
}

export function sortPosts(posts, sortMethod) {
  return function sortThunk(dispatch) {
    var sorted = "";
    if (sortMethod === "voteScore") {
      sorted = sortByVoteScore(posts);
    }
    else if (sortMethod === "timestamp") {
      sorted = sortbyTimestamp(posts);
    }
    else {
      return console.log('invalid sort');
    }
    return dispatch({type: SORT_POSTS, posts:sorted, sort:sortMethod});
  };
}

export function changeVoteScore(post, vote) {
  return function changeVoteScoreThunk(dispatch, getState) {
    updateVoteScore(post, vote).then(response => {
      var id = response.id;
      var voteScore = response.voteScore;
      dispatch({type: CHANGE_VOTESCORE, id: id, voteScore: voteScore });
        const updatedPosts = getState().postsReducer.posts;
        const sortMethod = getState().postsReducer.sortedby;
        return dispatch(sortPosts(updatedPosts, sortMethod));
      });
  };
}


export function fetchAllIDs() {
  return function fetchAllIDsThunk(dispatch) {
    getPosts().then(response => {
      dispatch({type: FETCH_ID, posts: response});
      });
    };
  }

export function newPost(activeView, id, timestamp, title, body, author, category) {
  return function newPostThunk(dispatch, getState) {
    addPost(id, timestamp, title, body, author, category).then(response => {
      console.log(response.category.toString());
      if ((activeView === "home") || (activeView === response.category)) {
        dispatch({type: ADD_POST, newPost: response });
      }
      const updatedPosts = getState().postsReducer.posts;
      const sortMethod = getState().postsReducer.sortedby;
      return dispatch(sortPosts(updatedPosts, sortMethod));
    });
  };
}

export function editPost(id, title, body) {
  return function editPostThunk(dispatch, getState) {
    updatePost(id, title, body).then(response => {
      dispatch({type: EDIT_POST, id: response.id, updatedPost: response });
      const updatedPosts = getState().postsReducer.posts;
      const sortMethod = getState().postsReducer.sortedby;
      return dispatch(sortPosts(updatedPosts, sortMethod));
    });
  };
}
