/*jshint esversion: 6*/
import { FETCH_POSTS, SORT_POSTS, CHANGE_VOTESCORE, ADD_POST, TOGGLE_POST_FORM } from '../actions/PostsAction';

const initialState = {
  posts: [],
  sortedby: "voteScore",
  postFormOpen: false
};

export function postsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return Object.assign({}, state,
        {posts: action.posts,
      });
    case SORT_POSTS:
      return Object.assign({}, state,
        {posts: action.posts,
        sortedby: action.sort
      });
      case CHANGE_VOTESCORE:
        return Object.assign({}, state,
          {posts: state.posts.map((post) => {
              if (post.id === action.id) {
                return Object.assign({}, post, {
                  voteScore: action.voteScore
                });
              }
            return post;
          })
      });
    case ADD_POST:
      return Object.assign({}, state,
        {posts: state.posts.concat(action.newPost),
      });
    case TOGGLE_POST_FORM:
      return Object.assign({}, state,
      {postFormOpen: action.formOpen,
      });
    default:
    return state;
  }
}
