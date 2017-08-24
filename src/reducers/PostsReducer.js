/*jshint esversion: 6*/
import { FETCH_POSTS } from '../actions/PostsAction';

export function postsReducer (state = {posts:[]}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return Object.assign({}, state,
        {posts: action.posts
      });
  default:
    return state;
  }
}
