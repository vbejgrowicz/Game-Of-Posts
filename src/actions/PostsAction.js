/*jshint esversion: 6*/
import { getPosts, getCategoryPosts, updateVoteScore, addPost } from '../utils/DataFetch';
import { sortByVoteScore, sortbyTimestamp } from '../utils/SortFunctions';


export const FETCH_POSTS = "FETCH_POSTS";
export const SORT_POSTS = "SORT_POSTS";
export const CHANGE_VOTESCORE = "CHANGE_VOTESCORE";
export const ADD_POST = "ADD_POST";
export const TOGGLE_POST_FORM = "TOGGLE_POST_FORM";


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

  export function newPost(id, timestamp, title, body, author, category) {
    return function newPostThunk(dispatch, getState) {
      addPost(id, timestamp, title, body, author, category).then(response => {
        dispatch({type: ADD_POST, newPost: response });
          const updatedPosts = getState().postsReducer.posts;
          const sortMethod = getState().postsReducer.sortedby;
          return dispatch(sortPosts(updatedPosts, sortMethod));
        });
    };
  }

  export function openPostForm() {
    return {
      type: TOGGLE_POST_FORM,
      formOpen: true
    };
  }

  export function closePostForm() {
    return {
      type: TOGGLE_POST_FORM,
      formOpen: false
    };
  }
