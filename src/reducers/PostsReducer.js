/*jshint esversion: 6*/
import {
  FETCH_POSTS,
  FETCH_POST,
  SORT_POSTS,
  UPDATE_SORT,
  CHANGE_VOTESCORE,
  ADD_POST,
  EDIT_POST,
  DELETE_POST
} from '../actions/PostsAction';
import { sortByVoteScore, sortbyTimestamp } from '../utils/SortFunctions';

const initialState = {
  posts: [],
  sortedby: "voteScore",
  IDsUsed: []
};

function sortPosts(posts, sortedby) {
  var sorted = "";
  if (sortedby === "voteScore") {
    sorted = sortByVoteScore(posts);
  }
  else if (sortedby === "timestamp") {
    sorted = sortbyTimestamp(posts);
  }
  else {
    return console.log('invalid sort');
  }
  return sorted;
}

export function postsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return Object.assign({}, state,
        {IDsUsed: state.IDsUsed.concat(action.idlist)},
        {posts: action.posts.filter(function(post) {return (post.deleted !== true);}),
      });
    case FETCH_POST:
      return Object.assign({}, state,
        {posts: action.posts}
      );
    case SORT_POSTS:
      return Object.assign({}, state,
        {posts: sortPosts(state.posts, state.sortedby),
      });
    case UPDATE_SORT:
      return Object.assign({}, state,
        {sortedby: action.sortMethod}
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
      return Object.assign({}, state,
        {IDsUsed: state.IDsUsed.concat(action.newPost.id)},
        {posts: sortPosts(state.posts.concat(action.newPost), state.sortedby),
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
      return Object.assign({}, state,
        {IDsUsed: state.IDsUsed.filter(function(id) {return (id !== action.id);})},
        {posts: state.posts.filter(function(post) {return (post.id !== action.id);}),
      }
    );
    default:
    return state;
  }
}
