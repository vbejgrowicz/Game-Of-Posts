/*jshint esversion: 6*/
import {
  FETCH_POSTS,
  FETCH_POST,
  SORT_POSTS,
  CHANGE_VOTESCORE,
  ADD_POST,
  FETCH_ID,
  EDIT_POST,
  DELETE_POST
} from '../actions/PostsAction';

const initialState = {
  posts: [],
  sortedby: "voteScore",
  IDsUsed: []
};

export function postsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return Object.assign({}, state,
        {posts: action.posts.filter(function(post) {return (post.deleted !== true);}),
      });
    case FETCH_POST:
      return Object.assign({}, state,
        {posts: action.posts}
      );
    case SORT_POSTS:
      return Object.assign({}, state,
        {posts: action.posts,
        sortedby: action.sort
      });
    case FETCH_ID:
      return Object.assign({},state,
        {IDsUsed: action.posts.map((post) => {
          return post.id;
        })}
      );
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
      return Object.assign({}, state, {
        posts: state.posts.concat(action.newPost),
      }
    );
    case EDIT_POST:
    return Object.assign({}, state,
      {posts: state.posts.map((post) => {
        if (post.id === action.id) {
          return Object.assign({}, post,
            action.updatedPost
            );
          }
        return post;
        })
      }
    );
    case DELETE_POST:
      return Object.assign({}, state, {
        posts: state.posts.filter(function(post) {return (post.id !== action.id);}),
      }
    );
    default:
    return state;
  }
}
