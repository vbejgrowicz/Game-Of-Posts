/*jshint esversion: 6*/
import { getPosts, getCategoryPosts } from '../utils/DataFetch';
import { sortByVoteScore, sortbyTimestamp } from '../utils/SortFunctions';


export const FETCH_POSTS = "FETCH_POSTS";
export const SORT_POSTS = "SORT_POSTS";

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

export function voteScoreSort(posts) {
  return function voteScoreSortThunk(dispatch) {
    var sorted = sortByVoteScore(posts);
    dispatch({type: SORT_POSTS, posts:sorted});
  };
}

export function timestampSort(posts) {
  return function timestampSortThunk(dispatch) {
    var sorted = sortbyTimestamp(posts);
    dispatch({type: SORT_POSTS, posts:sorted});
  };
}
