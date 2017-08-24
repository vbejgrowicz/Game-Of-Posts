/*jshint esversion: 6*/
import { getPosts, getCategoryPosts } from '../utils/DataFetch';

export const FETCH_POSTS = "FETCH_POSTS";
export const FETCH_CATEGORY_POSTS = "FETCH_CATEGORY_POSTS";

export function fetchPosts() {
  return function fetchPostsThunk(dispatch) {
    getPosts().then(response => {
      dispatch({type: FETCH_POSTS, posts: response});
    });
  };
}

export function fetchCategoryPosts(category) {
  return function fetchCategoryPostsThunk(dispatch) {
    getCategoryPosts(category).then(response => {
      dispatch({type: FETCH_POSTS, posts: response});
    });
  };
}
